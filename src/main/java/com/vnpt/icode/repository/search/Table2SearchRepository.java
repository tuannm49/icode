package com.vnpt.icode.repository.search;

import com.vnpt.icode.domain.Table2;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Table2} entity.
 */
public interface Table2SearchRepository extends ElasticsearchRepository<Table2, Long> {
}
