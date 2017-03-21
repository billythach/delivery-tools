package com.lyra.delivery.repository;

import com.lyra.delivery.domain.UserDelivery;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the UserDelivery entity.
 */
@SuppressWarnings("unused")
public interface UserDeliveryRepository extends JpaRepository<UserDelivery,Long> {

}
