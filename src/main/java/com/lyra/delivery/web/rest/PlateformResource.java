package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.Plateform;

import com.lyra.delivery.repository.PlateformRepository;
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
 * REST controller for managing Plateform.
 */
@RestController
@RequestMapping("/api")
public class PlateformResource {

    private final Logger log = LoggerFactory.getLogger(PlateformResource.class);

    private static final String ENTITY_NAME = "plateform";
        
    private final PlateformRepository plateformRepository;

    public PlateformResource(PlateformRepository plateformRepository) {
        this.plateformRepository = plateformRepository;
    }

    /**
     * POST  /plateforms : Create a new plateform.
     *
     * @param plateform the plateform to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plateform, or with status 400 (Bad Request) if the plateform has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plateforms")
    @Timed
    public ResponseEntity<Plateform> createPlateform(@RequestBody Plateform plateform) throws URISyntaxException {
        log.debug("REST request to save Plateform : {}", plateform);
        if (plateform.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new plateform cannot already have an ID")).body(null);
        }
        Plateform result = plateformRepository.save(plateform);
        return ResponseEntity.created(new URI("/api/plateforms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plateforms : Updates an existing plateform.
     *
     * @param plateform the plateform to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plateform,
     * or with status 400 (Bad Request) if the plateform is not valid,
     * or with status 500 (Internal Server Error) if the plateform couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plateforms")
    @Timed
    public ResponseEntity<Plateform> updatePlateform(@RequestBody Plateform plateform) throws URISyntaxException {
        log.debug("REST request to update Plateform : {}", plateform);
        if (plateform.getId() == null) {
            return createPlateform(plateform);
        }
        Plateform result = plateformRepository.save(plateform);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plateform.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plateforms : get all the plateforms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of plateforms in body
     */
    @GetMapping("/plateforms")
    @Timed
    public List<Plateform> getAllPlateforms() {
        log.debug("REST request to get all Plateforms");
        List<Plateform> plateforms = plateformRepository.findAll();
        return plateforms;
    }

    /**
     * GET  /plateforms/:id : get the "id" plateform.
     *
     * @param id the id of the plateform to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plateform, or with status 404 (Not Found)
     */
    @GetMapping("/plateforms/{id}")
    @Timed
    public ResponseEntity<Plateform> getPlateform(@PathVariable Long id) {
        log.debug("REST request to get Plateform : {}", id);
        Plateform plateform = plateformRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(plateform));
    }

    /**
     * DELETE  /plateforms/:id : delete the "id" plateform.
     *
     * @param id the id of the plateform to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plateforms/{id}")
    @Timed
    public ResponseEntity<Void> deletePlateform(@PathVariable Long id) {
        log.debug("REST request to delete Plateform : {}", id);
        plateformRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
