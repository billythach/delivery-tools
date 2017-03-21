package com.lyra.delivery.web.rest;

import com.lyra.delivery.DeliveryToolsApp;

import com.lyra.delivery.domain.TestYourApp;
import com.lyra.delivery.repository.TestYourAppRepository;
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
 * Test class for the TestYourAppResource REST controller.
 *
 * @see TestYourAppResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryToolsApp.class)
public class TestYourAppResourceIntTest {

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private TestYourAppRepository testYourAppRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTestYourAppMockMvc;

    private TestYourApp testYourApp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TestYourAppResource testYourAppResource = new TestYourAppResource(testYourAppRepository);
        this.restTestYourAppMockMvc = MockMvcBuilders.standaloneSetup(testYourAppResource)
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
    public static TestYourApp createEntity(EntityManager em) {
        TestYourApp testYourApp = new TestYourApp()
            .link(DEFAULT_LINK);
        return testYourApp;
    }

    @Before
    public void initTest() {
        testYourApp = createEntity(em);
    }

    @Test
    @Transactional
    public void createTestYourApp() throws Exception {
        int databaseSizeBeforeCreate = testYourAppRepository.findAll().size();

        // Create the TestYourApp
        restTestYourAppMockMvc.perform(post("/api/test-your-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testYourApp)))
            .andExpect(status().isCreated());

        // Validate the TestYourApp in the database
        List<TestYourApp> testYourAppList = testYourAppRepository.findAll();
        assertThat(testYourAppList).hasSize(databaseSizeBeforeCreate + 1);
        TestYourApp testTestYourApp = testYourAppList.get(testYourAppList.size() - 1);
        assertThat(testTestYourApp.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createTestYourAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testYourAppRepository.findAll().size();

        // Create the TestYourApp with an existing ID
        testYourApp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTestYourAppMockMvc.perform(post("/api/test-your-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testYourApp)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<TestYourApp> testYourAppList = testYourAppRepository.findAll();
        assertThat(testYourAppList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTestYourApps() throws Exception {
        // Initialize the database
        testYourAppRepository.saveAndFlush(testYourApp);

        // Get all the testYourAppList
        restTestYourAppMockMvc.perform(get("/api/test-your-apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testYourApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }

    @Test
    @Transactional
    public void getTestYourApp() throws Exception {
        // Initialize the database
        testYourAppRepository.saveAndFlush(testYourApp);

        // Get the testYourApp
        restTestYourAppMockMvc.perform(get("/api/test-your-apps/{id}", testYourApp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(testYourApp.getId().intValue()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTestYourApp() throws Exception {
        // Get the testYourApp
        restTestYourAppMockMvc.perform(get("/api/test-your-apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTestYourApp() throws Exception {
        // Initialize the database
        testYourAppRepository.saveAndFlush(testYourApp);
        int databaseSizeBeforeUpdate = testYourAppRepository.findAll().size();

        // Update the testYourApp
        TestYourApp updatedTestYourApp = testYourAppRepository.findOne(testYourApp.getId());
        updatedTestYourApp
            .link(UPDATED_LINK);

        restTestYourAppMockMvc.perform(put("/api/test-your-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTestYourApp)))
            .andExpect(status().isOk());

        // Validate the TestYourApp in the database
        List<TestYourApp> testYourAppList = testYourAppRepository.findAll();
        assertThat(testYourAppList).hasSize(databaseSizeBeforeUpdate);
        TestYourApp testTestYourApp = testYourAppList.get(testYourAppList.size() - 1);
        assertThat(testTestYourApp.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingTestYourApp() throws Exception {
        int databaseSizeBeforeUpdate = testYourAppRepository.findAll().size();

        // Create the TestYourApp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTestYourAppMockMvc.perform(put("/api/test-your-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(testYourApp)))
            .andExpect(status().isCreated());

        // Validate the TestYourApp in the database
        List<TestYourApp> testYourAppList = testYourAppRepository.findAll();
        assertThat(testYourAppList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTestYourApp() throws Exception {
        // Initialize the database
        testYourAppRepository.saveAndFlush(testYourApp);
        int databaseSizeBeforeDelete = testYourAppRepository.findAll().size();

        // Get the testYourApp
        restTestYourAppMockMvc.perform(delete("/api/test-your-apps/{id}", testYourApp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TestYourApp> testYourAppList = testYourAppRepository.findAll();
        assertThat(testYourAppList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TestYourApp.class);
    }
}
