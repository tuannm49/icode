package com.vnpt.icode.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link Table2SearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class Table2SearchRepositoryMockConfiguration {

    @MockBean
    private Table2SearchRepository mockTable2SearchRepository;

}
