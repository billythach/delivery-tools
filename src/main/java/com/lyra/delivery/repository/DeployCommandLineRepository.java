package com.lyra.delivery.repository;

import com.lyra.delivery.domain.DeployCommandLine;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the DeployCommandLine entity.
 */
@SuppressWarnings("unused")
public interface DeployCommandLineRepository extends JpaRepository<DeployCommandLine,Long> {

}
