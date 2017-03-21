package com.lyra.delivery.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyra.delivery.domain.Issue;

import com.lyra.delivery.repository.IssueRepository;
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
 * REST controller for managing Issue.
 */
@RestController
@RequestMapping("/api")
public class IssueResource {

    private final Logger log = LoggerFactory.getLogger(IssueResource.class);

    private static final String ENTITY_NAME = "issue";
        
    private final IssueRepository issueRepository;

    public IssueResource(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    /**
     * POST  /issues : Create a new issue.
     *
     * @param issue the issue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new issue, or with status 400 (Bad Request) if the issue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/issues")
    @Timed
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to save Issue : {}", issue);
        if (issue.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new issue cannot already have an ID")).body(null);
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.created(new URI("/api/issues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /issues : Updates an existing issue.
     *
     * @param issue the issue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated issue,
     * or with status 400 (Bad Request) if the issue is not valid,
     * or with status 500 (Internal Server Error) if the issue couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/issues")
    @Timed
    public ResponseEntity<Issue> updateIssue(@RequestBody Issue issue) throws URISyntaxException {
        log.debug("REST request to update Issue : {}", issue);
        if (issue.getId() == null) {
            return createIssue(issue);
        }
        Issue result = issueRepository.save(issue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, issue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /issues : get all the issues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of issues in body
     */
    @GetMapping("/issues")
    @Timed
    public List<Issue> getAllIssues() {
        log.debug("REST request to get all Issues");
        List<Issue> issues = issueRepository.findAll();
        return issues;
    }

    /**
     * GET  /issues/:id : get the "id" issue.
     *
     * @param id the id of the issue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the issue, or with status 404 (Not Found)
     */
    @GetMapping("/issues/{id}")
    @Timed
    public ResponseEntity<Issue> getIssue(@PathVariable Long id) {
        log.debug("REST request to get Issue : {}", id);
        Issue issue = issueRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(issue));
    }

    /**
     * DELETE  /issues/:id : delete the "id" issue.
     *
     * @param id the id of the issue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/issues/{id}")
    @Timed
    public ResponseEntity<Void> deleteIssue(@PathVariable Long id) {
        log.debug("REST request to delete Issue : {}", id);
        issueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
