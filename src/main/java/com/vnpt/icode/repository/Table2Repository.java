package com.vnpt.icode.repository;

import com.vnpt.icode.domain.Table2;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Table2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Table2Repository extends JpaRepository<Table2, Long> {
}
