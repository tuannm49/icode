package com.vnpt.icode.repository.search;

import com.vnpt.icode.domain.Table1;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Table1} entity.
 */
public interface Table1SearchRepository extends ElasticsearchRepository<Table1, Long> {
}
