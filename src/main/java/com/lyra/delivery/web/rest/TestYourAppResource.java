package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.TestYourApp;

import com.lyra.delivery.repository.TestYourAppRepository;
import com.lyra.delivery.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TestYourApp.
 */
@RestController
@RequestMapping("/api")
public class TestYourAppResource {

    private final Logger log = LoggerFactory.getLogger(TestYourAppResource.class);

    private static final String ENTITY_NAME = "testYourApp";
        
    private final TestYourAppRepository testYourAppRepository;

    public TestYourAppResource(TestYourAppRepository testYourAppRepository) {
        this.testYourAppRepository = testYourAppRepository;
    }

    /**
     * POST  /test-your-apps : Create a new testYourApp.
     *
     * @param testYourApp the testYourApp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new testYourApp, or with status 400 (Bad Request) if the testYourApp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/test-your-apps")
    @Timed
    public ResponseEntity<TestYourApp> createTestYourApp(@RequestBody TestYourApp testYourApp) throws URISyntaxException {
        log.debug("REST request to save TestYourApp : {}", testYourApp);
        if (testYourApp.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new testYourApp cannot already have an ID")).body(null);
        }
        TestYourApp result = testYourAppRepository.save(testYourApp);
        return ResponseEntity.created(new URI("/api/test-your-apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /test-your-apps : Updates an existing testYourApp.
     *
     * @param testYourApp the testYourApp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated testYourApp,
     * or with status 400 (Bad Request) if the testYourApp is not valid,
     * or with status 500 (Internal Server Error) if the testYourApp couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/test-your-apps")
    @Timed
    public ResponseEntity<TestYourApp> updateTestYourApp(@RequestBody TestYourApp testYourApp) throws URISyntaxException {
        log.debug("REST request to update TestYourApp : {}", testYourApp);
        if (testYourApp.getId() == null) {
            return createTestYourApp(testYourApp);
        }
        TestYourApp result = testYourAppRepository.save(testYourApp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, testYourApp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /test-your-apps : get all the testYourApps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of testYourApps in body
     */
    @GetMapping("/test-your-apps")
    @Timed
    public List<TestYourApp> getAllTestYourApps() {
        log.debug("REST request to get all TestYourApps");
        List<TestYourApp> testYourApps = testYourAppRepository.findAll();
        return testYourApps;
    }

    /**
     * GET  /test-your-apps/:id : get the "id" testYourApp.
     *
     * @param id the id of the testYourApp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the testYourApp, or with status 404 (Not Found)
     */
    @GetMapping("/test-your-apps/{id}")
    @Timed
    public ResponseEntity<TestYourApp> getTestYourApp(@PathVariable Long id) {
        log.debug("REST request to get TestYourApp : {}", id);
        TestYourApp testYourApp = testYourAppRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(testYourApp));
    }

    /**
     * DELETE  /test-your-apps/:id : delete the "id" testYourApp.
     *
     * @param id the id of the testYourApp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/test-your-apps/{id}")
    @Timed
    public ResponseEntity<Void> deleteTestYourApp(@PathVariable Long id) {
        log.debug("REST request to delete TestYourApp : {}", id);
        testYourAppRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
