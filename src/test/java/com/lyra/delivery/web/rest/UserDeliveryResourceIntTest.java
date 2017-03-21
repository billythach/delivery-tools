package com.lyra.delivery.web.rest;

import com.lyra.delivery.DeliveryToolsApp;

import com.lyra.delivery.domain.UserDelivery;
import com.lyra.delivery.repository.UserDeliveryRepository;
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

import com.lyra.delivery.domain.enumeration.UserDeliveryType;
/**
 * Test class for the UserDeliveryResource REST controller.
 *
 * @see UserDeliveryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryToolsApp.class)
public class UserDeliveryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final UserDeliveryType DEFAULT_TYPE = UserDeliveryType.DEVELOPER;
    private static final UserDeliveryType UPDATED_TYPE = UserDeliveryType.EXPLOITATION;

    @Autowired
    private UserDeliveryRepository userDeliveryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserDeliveryMockMvc;

    private UserDelivery userDelivery;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserDeliveryResource userDeliveryResource = new UserDeliveryResource(userDeliveryRepository);
        this.restUserDeliveryMockMvc = MockMvcBuilders.standaloneSetup(userDeliveryResource)
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
    public static UserDelivery createEntity(EntityManager em) {
        UserDelivery userDelivery = new UserDelivery()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE);
        return userDelivery;
    }

    @Before
    public void initTest() {
        userDelivery = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserDelivery() throws Exception {
        int databaseSizeBeforeCreate = userDeliveryRepository.findAll().size();

        // Create the UserDelivery
        restUserDeliveryMockMvc.perform(post("/api/user-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userDelivery)))
            .andExpect(status().isCreated());

        // Validate the UserDelivery in the database
        List<UserDelivery> userDeliveryList = userDeliveryRepository.findAll();
        assertThat(userDeliveryList).hasSize(databaseSizeBeforeCreate + 1);
        UserDelivery testUserDelivery = userDeliveryList.get(userDeliveryList.size() - 1);
        assertThat(testUserDelivery.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserDelivery.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createUserDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userDeliveryRepository.findAll().size();

        // Create the UserDelivery with an existing ID
        userDelivery.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserDeliveryMockMvc.perform(post("/api/user-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userDelivery)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserDelivery> userDeliveryList = userDeliveryRepository.findAll();
        assertThat(userDeliveryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserDeliveries() throws Exception {
        // Initialize the database
        userDeliveryRepository.saveAndFlush(userDelivery);

        // Get all the userDeliveryList
        restUserDeliveryMockMvc.perform(get("/api/user-deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userDelivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void getUserDelivery() throws Exception {
        // Initialize the database
        userDeliveryRepository.saveAndFlush(userDelivery);

        // Get the userDelivery
        restUserDeliveryMockMvc.perform(get("/api/user-deliveries/{id}", userDelivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userDelivery.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserDelivery() throws Exception {
        // Get the userDelivery
        restUserDeliveryMockMvc.perform(get("/api/user-deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserDelivery() throws Exception {
        // Initialize the database
        userDeliveryRepository.saveAndFlush(userDelivery);
        int databaseSizeBeforeUpdate = userDeliveryRepository.findAll().size();

        // Update the userDelivery
        UserDelivery updatedUserDelivery = userDeliveryRepository.findOne(userDelivery.getId());
        updatedUserDelivery
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE);

        restUserDeliveryMockMvc.perform(put("/api/user-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserDelivery)))
            .andExpect(status().isOk());

        // Validate the UserDelivery in the database
        List<UserDelivery> userDeliveryList = userDeliveryRepository.findAll();
        assertThat(userDeliveryList).hasSize(databaseSizeBeforeUpdate);
        UserDelivery testUserDelivery = userDeliveryList.get(userDeliveryList.size() - 1);
        assertThat(testUserDelivery.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserDelivery.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserDelivery() throws Exception {
        int databaseSizeBeforeUpdate = userDeliveryRepository.findAll().size();

        // Create the UserDelivery

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserDeliveryMockMvc.perform(put("/api/user-deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userDelivery)))
            .andExpect(status().isCreated());

        // Validate the UserDelivery in the database
        List<UserDelivery> userDeliveryList = userDeliveryRepository.findAll();
        assertThat(userDeliveryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserDelivery() throws Exception {
        // Initialize the database
        userDeliveryRepository.saveAndFlush(userDelivery);
        int databaseSizeBeforeDelete = userDeliveryRepository.findAll().size();

        // Get the userDelivery
        restUserDeliveryMockMvc.perform(delete("/api/user-deliveries/{id}", userDelivery.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserDelivery> userDeliveryList = userDeliveryRepository.findAll();
        assertThat(userDeliveryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserDelivery.class);
    }
}
