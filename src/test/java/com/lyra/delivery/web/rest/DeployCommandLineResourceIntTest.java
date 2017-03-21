package com.lyra.delivery.web.rest;

import com.lyra.delivery.DeliveryToolsApp;

import com.lyra.delivery.domain.DeployCommandLine;
import com.lyra.delivery.repository.DeployCommandLineRepository;
import com.lyra.delivery.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeployCommandLineResource REST controller.
 *
 * @see DeployCommandLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryToolsApp.class)
public class DeployCommandLineResourceIntTest {

    private static final String DEFAULT_PATTERN = "AAAAAAAAAA";
    private static final String UPDATED_PATTERN = "BBBBBBBBBB";

    @Autowired
    private DeployCommandLineRepository deployCommandLineRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeployCommandLineMockMvc;

    private DeployCommandLine deployCommandLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DeployCommandLineResource deployCommandLineResource = new DeployCommandLineResource(deployCommandLineRepository);
        this.restDeployCommandLineMockMvc = MockMvcBuilders.standaloneSetup(deployCommandLineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeployCommandLine createEntity(EntityManager em) {
        DeployCommandLine deployCommandLine = new DeployCommandLine()
            .pattern(DEFAULT_PATTERN);
        return deployCommandLine;
    }

    @Before
    public void initTest() {
        deployCommandLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeployCommandLine() throws Exception {
        int databaseSizeBeforeCreate = deployCommandLineRepository.findAll().size();

        // Create the DeployCommandLine
        restDeployCommandLineMockMvc.perform(post("/api/deploy-command-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployCommandLine)))
            .andExpect(status().isCreated());

        // Validate the DeployCommandLine in the database
        List<DeployCommandLine> deployCommandLineList = deployCommandLineRepository.findAll();
        assertThat(deployCommandLineList).hasSize(databaseSizeBeforeCreate + 1);
        DeployCommandLine testDeployCommandLine = deployCommandLineList.get(deployCommandLineList.size() - 1);
        assertThat(testDeployCommandLine.getPattern()).isEqualTo(DEFAULT_PATTERN);
    }

    @Test
    @Transactional
    public void createDeployCommandLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deployCommandLineRepository.findAll().size();

        // Create the DeployCommandLine with an existing ID
        deployCommandLine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeployCommandLineMockMvc.perform(post("/api/deploy-command-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployCommandLine)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<DeployCommandLine> deployCommandLineList = deployCommandLineRepository.findAll();
        assertThat(deployCommandLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeployCommandLines() throws Exception {
        // Initialize the database
        deployCommandLineRepository.saveAndFlush(deployCommandLine);

        // Get all the deployCommandLineList
        restDeployCommandLineMockMvc.perform(get("/api/deploy-command-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deployCommandLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].pattern").value(hasItem(DEFAULT_PATTERN.toString())));
    }

    @Test
    @Transactional
    public void getDeployCommandLine() throws Exception {
        // Initialize the database
        deployCommandLineRepository.saveAndFlush(deployCommandLine);

        // Get the deployCommandLine
        restDeployCommandLineMockMvc.perform(get("/api/deploy-command-lines/{id}", deployCommandLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deployCommandLine.getId().intValue()))
            .andExpect(jsonPath("$.pattern").value(DEFAULT_PATTERN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeployCommandLine() throws Exception {
        // Get the deployCommandLine
        restDeployCommandLineMockMvc.perform(get("/api/deploy-command-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeployCommandLine() throws Exception {
        // Initialize the database
        deployCommandLineRepository.saveAndFlush(deployCommandLine);
        int databaseSizeBeforeUpdate = deployCommandLineRepository.findAll().size();

        // Update the deployCommandLine
        DeployCommandLine updatedDeployCommandLine = deployCommandLineRepository.findOne(deployCommandLine.getId());
        updatedDeployCommandLine
            .pattern(UPDATED_PATTERN);

        restDeployCommandLineMockMvc.perform(put("/api/deploy-command-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeployCommandLine)))
            .andExpect(status().isOk());

        // Validate the DeployCommandLine in the database
        List<DeployCommandLine> deployCommandLineList = deployCommandLineRepository.findAll();
        assertThat(deployCommandLineList).hasSize(databaseSizeBeforeUpdate);
        DeployCommandLine testDeployCommandLine = deployCommandLineList.get(deployCommandLineList.size() - 1);
        assertThat(testDeployCommandLine.getPattern()).isEqualTo(UPDATED_PATTERN);
    }

    @Test
    @Transactional
    public void updateNonExistingDeployCommandLine() throws Exception {
        int databaseSizeBeforeUpdate = deployCommandLineRepository.findAll().size();

        // Create the DeployCommandLine

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeployCommandLineMockMvc.perform(put("/api/deploy-command-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployCommandLine)))
            .andExpect(status().isCreated());

        // Validate the DeployCommandLine in the database
        List<DeployCommandLine> deployCommandLineList = deployCommandLineRepository.findAll();
        assertThat(deployCommandLineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeployCommandLine() throws Exception {
        // Initialize the database
        deployCommandLineRepository.saveAndFlush(deployCommandLine);
        int databaseSizeBeforeDelete = deployCommandLineRepository.findAll().size();

        // Get the deployCommandLine
        restDeployCommandLineMockMvc.perform(delete("/api/deploy-command-lines/{id}", deployCommandLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeployCommandLine> deployCommandLineList = deployCommandLineRepository.findAll();
        assertThat(deployCommandLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeployCommandLine.class);
    }
}
