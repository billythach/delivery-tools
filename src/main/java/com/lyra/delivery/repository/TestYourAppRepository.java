package com.lyra.delivery.repository;

import com.lyra.delivery.domain.TestYourApp;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the TestYourApp entity.
 */
@SuppressWarnings("unused")
public interface TestYourAppRepository extends JpaRepository<TestYourApp,Long> {

}
