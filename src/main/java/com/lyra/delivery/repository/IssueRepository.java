package com.lyra.delivery.repository;

import com.lyra.delivery.domain.Issue;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Issue entity.
 */
@SuppressWarnings("unused")
public interface IssueRepository extends JpaRepository<Issue,Long> {

}
