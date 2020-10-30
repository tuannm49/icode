package com.vnpt.icode.repository;

import com.vnpt.icode.domain.Table1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Table1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Table1Repository extends JpaRepository<Table1, Long> {
}
