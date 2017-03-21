package com.lyra.delivery.repository;

import com.lyra.delivery.domain.Deployment;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Deployment entity.
 */
@SuppressWarnings("unused")
public interface DeploymentRepository extends JpaRepository<Deployment,Long> {

    @Query("select distinct deployment from Deployment deployment left join fetch deployment.deliveryDevs left join fetch deployment.deliveryExploitations")
    List<Deployment> findAllWithEagerRelationships();

    @Query("select deployment from Deployment deployment left join fetch deployment.deliveryDevs left join fetch deployment.deliveryExploitations where deployment.id =:id")
    Deployment findOneWithEagerRelationships(@Param("id") Long id);

}
