package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.UserDelivery;

import com.lyra.delivery.repository.UserDeliveryRepository;
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
 * REST controller for managing UserDelivery.
 */
@RestController
@RequestMapping("/api")
public class UserDeliveryResource {

    private final Logger log = LoggerFactory.getLogger(UserDeliveryResource.class);

    private static final String ENTITY_NAME = "userDelivery";
        
    private final UserDeliveryRepository userDeliveryRepository;

    public UserDeliveryResource(UserDeliveryRepository userDeliveryRepository) {
        this.userDeliveryRepository = userDeliveryRepository;
    }

    /**
     * POST  /user-deliveries : Create a new userDelivery.
     *
     * @param userDelivery the userDelivery to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userDelivery, or with status 400 (Bad Request) if the userDelivery has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-deliveries")
    @Timed
    public ResponseEntity<UserDelivery> createUserDelivery(@RequestBody UserDelivery userDelivery) throws URISyntaxException {
        log.debug("REST request to save UserDelivery : {}", userDelivery);
        if (userDelivery.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userDelivery cannot already have an ID")).body(null);
        }
        UserDelivery result = userDeliveryRepository.save(userDelivery);
        return ResponseEntity.created(new URI("/api/user-deliveries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-deliveries : Updates an existing userDelivery.
     *
     * @param userDelivery the userDelivery to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userDelivery,
     * or with status 400 (Bad Request) if the userDelivery is not valid,
     * or with status 500 (Internal Server Error) if the userDelivery couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-deliveries")
    @Timed
    public ResponseEntity<UserDelivery> updateUserDelivery(@RequestBody UserDelivery userDelivery) throws URISyntaxException {
        log.debug("REST request to update UserDelivery : {}", userDelivery);
        if (userDelivery.getId() == null) {
            return createUserDelivery(userDelivery);
        }
        UserDelivery result = userDeliveryRepository.save(userDelivery);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userDelivery.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-deliveries : get all the userDeliveries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userDeliveries in body
     */
    @GetMapping("/user-deliveries")
    @Timed
    public List<UserDelivery> getAllUserDeliveries() {
        log.debug("REST request to get all UserDeliveries");
        List<UserDelivery> userDeliveries = userDeliveryRepository.findAll();
        return userDeliveries;
    }

    /**
     * GET  /user-deliveries/:id : get the "id" userDelivery.
     *
     * @param id the id of the userDelivery to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userDelivery, or with status 404 (Not Found)
     */
    @GetMapping("/user-deliveries/{id}")
    @Timed
    public ResponseEntity<UserDelivery> getUserDelivery(@PathVariable Long id) {
        log.debug("REST request to get UserDelivery : {}", id);
        UserDelivery userDelivery = userDeliveryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userDelivery));
    }

    /**
     * DELETE  /user-deliveries/:id : delete the "id" userDelivery.
     *
     * @param id the id of the userDelivery to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-deliveries/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserDelivery(@PathVariable Long id) {
        log.debug("REST request to delete UserDelivery : {}", id);
        userDeliveryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
