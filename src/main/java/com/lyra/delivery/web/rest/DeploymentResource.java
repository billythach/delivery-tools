package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.Deployment;

import com.lyra.delivery.repository.DeploymentRepository;
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
 * REST controller for managing Deployment.
 */
@RestController
@RequestMapping("/api")
public class DeploymentResource {

    private final Logger log = LoggerFactory.getLogger(DeploymentResource.class);

    private static final String ENTITY_NAME = "deployment";
        
    private final DeploymentRepository deploymentRepository;

    public DeploymentResource(DeploymentRepository deploymentRepository) {
        this.deploymentRepository = deploymentRepository;
    }

    /**
     * POST  /deployments : Create a new deployment.
     *
     * @param deployment the deployment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deployment, or with status 400 (Bad Request) if the deployment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deployments")
    @Timed
    public ResponseEntity<Deployment> createDeployment(@RequestBody Deployment deployment) throws URISyntaxException {
        log.debug("REST request to save Deployment : {}", deployment);
        if (deployment.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new deployment cannot already have an ID")).body(null);
        }
        Deployment result = deploymentRepository.save(deployment);
        return ResponseEntity.created(new URI("/api/deployments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deployments : Updates an existing deployment.
     *
     * @param deployment the deployment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deployment,
     * or with status 400 (Bad Request) if the deployment is not valid,
     * or with status 500 (Internal Server Error) if the deployment couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deployments")
    @Timed
    public ResponseEntity<Deployment> updateDeployment(@RequestBody Deployment deployment) throws URISyntaxException {
        log.debug("REST request to update Deployment : {}", deployment);
        if (deployment.getId() == null) {
            return createDeployment(deployment);
        }
        Deployment result = deploymentRepository.save(deployment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deployment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deployments : get all the deployments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deployments in body
     */
    @GetMapping("/deployments")
    @Timed
    public List<Deployment> getAllDeployments() {
        log.debug("REST request to get all Deployments");
        List<Deployment> deployments = deploymentRepository.findAllWithEagerRelationships();
        return deployments;
    }

    /**
     * GET  /deployments/:id : get the "id" deployment.
     *
     * @param id the id of the deployment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deployment, or with status 404 (Not Found)
     */
    @GetMapping("/deployments/{id}")
    @Timed
    public ResponseEntity<Deployment> getDeployment(@PathVariable Long id) {
        log.debug("REST request to get Deployment : {}", id);
        Deployment deployment = deploymentRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deployment));
    }

    /**
     * DELETE  /deployments/:id : delete the "id" deployment.
     *
     * @param id the id of the deployment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deployments/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeployment(@PathVariable Long id) {
        log.debug("REST request to delete Deployment : {}", id);
        deploymentRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
