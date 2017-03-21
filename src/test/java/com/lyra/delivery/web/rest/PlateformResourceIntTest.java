package com.lyra.delivery.web.rest;

import com.lyra.delivery.DeliveryToolsApp;

import com.lyra.delivery.domain.Plateform;
import com.lyra.delivery.repository.PlateformRepository;
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
 * Test class for the PlateformResource REST controller.
 *
 * @see PlateformResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryToolsApp.class)
public class PlateformResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PlateformRepository plateformRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlateformMockMvc;

    private Plateform plateform;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        PlateformResource plateformResource = new PlateformResource(plateformRepository);
        this.restPlateformMockMvc = MockMvcBuilders.standaloneSetup(plateformResource)
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
    public static Plateform createEntity(EntityManager em) {
        Plateform plateform = new Plateform()
            .name(DEFAULT_NAME);
        return plateform;
    }

    @Before
    public void initTest() {
        plateform = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlateform() throws Exception {
        int databaseSizeBeforeCreate = plateformRepository.findAll().size();

        // Create the Plateform
        restPlateformMockMvc.perform(post("/api/plateforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateform)))
            .andExpect(status().isCreated());

        // Validate the Plateform in the database
        List<Plateform> plateformList = plateformRepository.findAll();
        assertThat(plateformList).hasSize(databaseSizeBeforeCreate + 1);
        Plateform testPlateform = plateformList.get(plateformList.size() - 1);
        assertThat(testPlateform.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPlateformWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = plateformRepository.findAll().size();

        // Create the Plateform with an existing ID
        plateform.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlateformMockMvc.perform(post("/api/plateforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateform)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Plateform> plateformList = plateformRepository.findAll();
        assertThat(plateformList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlateforms() throws Exception {
        // Initialize the database
        plateformRepository.saveAndFlush(plateform);

        // Get all the plateformList
        restPlateformMockMvc.perform(get("/api/plateforms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plateform.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPlateform() throws Exception {
        // Initialize the database
        plateformRepository.saveAndFlush(plateform);

        // Get the plateform
        restPlateformMockMvc.perform(get("/api/plateforms/{id}", plateform.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plateform.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlateform() throws Exception {
        // Get the plateform
        restPlateformMockMvc.perform(get("/api/plateforms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlateform() throws Exception {
        // Initialize the database
        plateformRepository.saveAndFlush(plateform);
        int databaseSizeBeforeUpdate = plateformRepository.findAll().size();

        // Update the plateform
        Plateform updatedPlateform = plateformRepository.findOne(plateform.getId());
        updatedPlateform
            .name(UPDATED_NAME);

        restPlateformMockMvc.perform(put("/api/plateforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlateform)))
            .andExpect(status().isOk());

        // Validate the Plateform in the database
        List<Plateform> plateformList = plateformRepository.findAll();
        assertThat(plateformList).hasSize(databaseSizeBeforeUpdate);
        Plateform testPlateform = plateformList.get(plateformList.size() - 1);
        assertThat(testPlateform.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPlateform() throws Exception {
        int databaseSizeBeforeUpdate = plateformRepository.findAll().size();

        // Create the Plateform

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPlateformMockMvc.perform(put("/api/plateforms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plateform)))
            .andExpect(status().isCreated());

        // Validate the Plateform in the database
        List<Plateform> plateformList = plateformRepository.findAll();
        assertThat(plateformList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePlateform() throws Exception {
        // Initialize the database
        plateformRepository.saveAndFlush(plateform);
        int databaseSizeBeforeDelete = plateformRepository.findAll().size();

        // Get the plateform
        restPlateformMockMvc.perform(delete("/api/plateforms/{id}", plateform.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plateform> plateformList = plateformRepository.findAll();
        assertThat(plateformList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plateform.class);
    }
}
