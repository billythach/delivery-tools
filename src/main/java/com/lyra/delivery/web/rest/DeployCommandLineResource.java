package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.DeployCommandLine;

import com.lyra.delivery.repository.DeployCommandLineRepository;
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
 * REST controller for managing DeployCommandLine.
 */
@RestController
@RequestMapping("/api")
public class DeployCommandLineResource {

    private final Logger log = LoggerFactory.getLogger(DeployCommandLineResource.class);

    private static final String ENTITY_NAME = "deployCommandLine";
        
    private final DeployCommandLineRepository deployCommandLineRepository;

    public DeployCommandLineResource(DeployCommandLineRepository deployCommandLineRepository) {
        this.deployCommandLineRepository = deployCommandLineRepository;
    }

    /**
     * POST  /deploy-command-lines : Create a new deployCommandLine.
     *
     * @param deployCommandLine the deployCommandLine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deployCommandLine, or with status 400 (Bad Request) if the deployCommandLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deploy-command-lines")
    @Timed
    public ResponseEntity<DeployCommandLine> createDeployCommandLine(@RequestBody DeployCommandLine deployCommandLine) throws URISyntaxException {
        log.debug("REST request to save DeployCommandLine : {}", deployCommandLine);
        if (deployCommandLine.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new deployCommandLine cannot already have an ID")).body(null);
        }
        DeployCommandLine result = deployCommandLineRepository.save(deployCommandLine);
        return ResponseEntity.created(new URI("/api/deploy-command-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deploy-command-lines : Updates an existing deployCommandLine.
     *
     * @param deployCommandLine the deployCommandLine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deployCommandLine,
     * or with status 400 (Bad Request) if the deployCommandLine is not valid,
     * or with status 500 (Internal Server Error) if the deployCommandLine couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deploy-command-lines")
    @Timed
    public ResponseEntity<DeployCommandLine> updateDeployCommandLine(@RequestBody DeployCommandLine deployCommandLine) throws URISyntaxException {
        log.debug("REST request to update DeployCommandLine : {}", deployCommandLine);
        if (deployCommandLine.getId() == null) {
            return createDeployCommandLine(deployCommandLine);
        }
        DeployCommandLine result = deployCommandLineRepository.save(deployCommandLine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deployCommandLine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deploy-command-lines : get all the deployCommandLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deployCommandLines in body
     */
    @GetMapping("/deploy-command-lines")
    @Timed
    public List<DeployCommandLine> getAllDeployCommandLines() {
        log.debug("REST request to get all DeployCommandLines");
        List<DeployCommandLine> deployCommandLines = deployCommandLineRepository.findAll();
        return deployCommandLines;
    }

    /**
     * GET  /deploy-command-lines/:id : get the "id" deployCommandLine.
     *
     * @param id the id of the deployCommandLine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deployCommandLine, or with status 404 (Not Found)
     */
    @GetMapping("/deploy-command-lines/{id}")
    @Timed
    public ResponseEntity<DeployCommandLine> getDeployCommandLine(@PathVariable Long id) {
        log.debug("REST request to get DeployCommandLine : {}", id);
        DeployCommandLine deployCommandLine = deployCommandLineRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deployCommandLine));
    }

    /**
     * DELETE  /deploy-command-lines/:id : delete the "id" deployCommandLine.
     *
     * @param id the id of the deployCommandLine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deploy-command-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeployCommandLine(@PathVariable Long id) {
        log.debug("REST request to delete DeployCommandLine : {}", id);
        deployCommandLineRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
