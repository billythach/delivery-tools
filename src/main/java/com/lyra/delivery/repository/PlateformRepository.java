package com.lyra.delivery.repository;

import com.lyra.delivery.domain.Plateform;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Plateform entity.
 */
@SuppressWarnings("unused")
public interface PlateformRepository extends JpaRepository<Plateform,Long> {

}
