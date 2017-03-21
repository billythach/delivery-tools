package com.lyra.delivery.web.rest;

import com.lyra.delivery.DeliveryToolsApp;

import com.lyra.delivery.domain.Deployment;
import com.lyra.delivery.repository.DeploymentRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.lyra.delivery.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeploymentResource REST controller.
 *
 * @see DeploymentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryToolsApp.class)
public class DeploymentResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DeploymentRepository deploymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeploymentMockMvc;

    private Deployment deployment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DeploymentResource deploymentResource = new DeploymentResource(deploymentRepository);
        this.restDeploymentMockMvc = MockMvcBuilders.standaloneSetup(deploymentResource)
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
    public static Deployment createEntity(EntityManager em) {
        Deployment deployment = new Deployment()
            .date(DEFAULT_DATE);
        return deployment;
    }

    @Before
    public void initTest() {
        deployment = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeployment() throws Exception {
        int databaseSizeBeforeCreate = deploymentRepository.findAll().size();

        // Create the Deployment
        restDeploymentMockMvc.perform(post("/api/deployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployment)))
            .andExpect(status().isCreated());

        // Validate the Deployment in the database
        List<Deployment> deploymentList = deploymentRepository.findAll();
        assertThat(deploymentList).hasSize(databaseSizeBeforeCreate + 1);
        Deployment testDeployment = deploymentList.get(deploymentList.size() - 1);
        assertThat(testDeployment.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createDeploymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deploymentRepository.findAll().size();

        // Create the Deployment with an existing ID
        deployment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeploymentMockMvc.perform(post("/api/deployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployment)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Deployment> deploymentList = deploymentRepository.findAll();
        assertThat(deploymentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeployments() throws Exception {
        // Initialize the database
        deploymentRepository.saveAndFlush(deployment);

        // Get all the deploymentList
        restDeploymentMockMvc.perform(get("/api/deployments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deployment.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getDeployment() throws Exception {
        // Initialize the database
        deploymentRepository.saveAndFlush(deployment);

        // Get the deployment
        restDeploymentMockMvc.perform(get("/api/deployments/{id}", deployment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deployment.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingDeployment() throws Exception {
        // Get the deployment
        restDeploymentMockMvc.perform(get("/api/deployments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeployment() throws Exception {
        // Initialize the database
        deploymentRepository.saveAndFlush(deployment);
        int databaseSizeBeforeUpdate = deploymentRepository.findAll().size();

        // Update the deployment
        Deployment updatedDeployment = deploymentRepository.findOne(deployment.getId());
        updatedDeployment
            .date(UPDATED_DATE);

        restDeploymentMockMvc.perform(put("/api/deployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeployment)))
            .andExpect(status().isOk());

        // Validate the Deployment in the database
        List<Deployment> deploymentList = deploymentRepository.findAll();
        assertThat(deploymentList).hasSize(databaseSizeBeforeUpdate);
        Deployment testDeployment = deploymentList.get(deploymentList.size() - 1);
        assertThat(testDeployment.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDeployment() throws Exception {
        int databaseSizeBeforeUpdate = deploymentRepository.findAll().size();

        // Create the Deployment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeploymentMockMvc.perform(put("/api/deployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deployment)))
            .andExpect(status().isCreated());

        // Validate the Deployment in the database
        List<Deployment> deploymentList = deploymentRepository.findAll();
        assertThat(deploymentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeployment() throws Exception {
        // Initialize the database
        deploymentRepository.saveAndFlush(deployment);
        int databaseSizeBeforeDelete = deploymentRepository.findAll().size();

        // Get the deployment
        restDeploymentMockMvc.perform(delete("/api/deployments/{id}", deployment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Deployment> deploymentList = deploymentRepository.findAll();
        assertThat(deploymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deployment.class);
    }
}
