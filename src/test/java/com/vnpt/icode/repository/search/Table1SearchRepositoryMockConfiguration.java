package com.vnpt.icode.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link Table1SearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class Table1SearchRepositoryMockConfiguration {

    @MockBean
    private Table1SearchRepository mockTable1SearchRepository;

}
