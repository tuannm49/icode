package com.vnpt.icode.web.rest;

import com.vnpt.icode.IcodeApp;
import com.vnpt.icode.domain.Table2;
import com.vnpt.icode.repository.Table2Repository;
import com.vnpt.icode.repository.search.Table2SearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Table2Resource} REST controller.
 */
@SpringBootTest(classes = IcodeApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class Table2ResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private Table2Repository table2Repository;

    /**
     * This repository is mocked in the com.vnpt.icode.repository.search test package.
     *
     * @see com.vnpt.icode.repository.search.Table2SearchRepositoryMockConfiguration
     */
    @Autowired
    private Table2SearchRepository mockTable2SearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTable2MockMvc;

    private Table2 table2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Table2 createEntity(EntityManager em) {
        Table2 table2 = new Table2()
            .name(DEFAULT_NAME);
        return table2;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Table2 createUpdatedEntity(EntityManager em) {
        Table2 table2 = new Table2()
            .name(UPDATED_NAME);
        return table2;
    }

    @BeforeEach
    public void initTest() {
        table2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTable2() throws Exception {
        int databaseSizeBeforeCreate = table2Repository.findAll().size();
        // Create the Table2
        restTable2MockMvc.perform(post("/api/table-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(table2)))
            .andExpect(status().isCreated());

        // Validate the Table2 in the database
        List<Table2> table2List = table2Repository.findAll();
        assertThat(table2List).hasSize(databaseSizeBeforeCreate + 1);
        Table2 testTable2 = table2List.get(table2List.size() - 1);
        assertThat(testTable2.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the Table2 in Elasticsearch
        verify(mockTable2SearchRepository, times(1)).save(testTable2);
    }

    @Test
    @Transactional
    public void createTable2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = table2Repository.findAll().size();

        // Create the Table2 with an existing ID
        table2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTable2MockMvc.perform(post("/api/table-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(table2)))
            .andExpect(status().isBadRequest());

        // Validate the Table2 in the database
        List<Table2> table2List = table2Repository.findAll();
        assertThat(table2List).hasSize(databaseSizeBeforeCreate);

        // Validate the Table2 in Elasticsearch
        verify(mockTable2SearchRepository, times(0)).save(table2);
    }


    @Test
    @Transactional
    public void getAllTable2s() throws Exception {
        // Initialize the database
        table2Repository.saveAndFlush(table2);

        // Get all the table2List
        restTable2MockMvc.perform(get("/api/table-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(table2.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getTable2() throws Exception {
        // Initialize the database
        table2Repository.saveAndFlush(table2);

        // Get the table2
        restTable2MockMvc.perform(get("/api/table-2-s/{id}", table2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(table2.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingTable2() throws Exception {
        // Get the table2
        restTable2MockMvc.perform(get("/api/table-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTable2() throws Exception {
        // Initialize the database
        table2Repository.saveAndFlush(table2);

        int databaseSizeBeforeUpdate = table2Repository.findAll().size();

        // Update the table2
        Table2 updatedTable2 = table2Repository.findById(table2.getId()).get();
        // Disconnect from session so that the updates on updatedTable2 are not directly saved in db
        em.detach(updatedTable2);
        updatedTable2
            .name(UPDATED_NAME);

        restTable2MockMvc.perform(put("/api/table-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTable2)))
            .andExpect(status().isOk());

        // Validate the Table2 in the database
        List<Table2> table2List = table2Repository.findAll();
        assertThat(table2List).hasSize(databaseSizeBeforeUpdate);
        Table2 testTable2 = table2List.get(table2List.size() - 1);
        assertThat(testTable2.getName()).isEqualTo(UPDATED_NAME);

        // Validate the Table2 in Elasticsearch
        verify(mockTable2SearchRepository, times(1)).save(testTable2);
    }

    @Test
    @Transactional
    public void updateNonExistingTable2() throws Exception {
        int databaseSizeBeforeUpdate = table2Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTable2MockMvc.perform(put("/api/table-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(table2)))
            .andExpect(status().isBadRequest());

        // Validate the Table2 in the database
        List<Table2> table2List = table2Repository.findAll();
        assertThat(table2List).hasSize(databaseSizeBeforeUpdate);

        // Validate the Table2 in Elasticsearch
        verify(mockTable2SearchRepository, times(0)).save(table2);
    }

    @Test
    @Transactional
    public void deleteTable2() throws Exception {
        // Initialize the database
        table2Repository.saveAndFlush(table2);

        int databaseSizeBeforeDelete = table2Repository.findAll().size();

        // Delete the table2
        restTable2MockMvc.perform(delete("/api/table-2-s/{id}", table2.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Table2> table2List = table2Repository.findAll();
        assertThat(table2List).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Table2 in Elasticsearch
        verify(mockTable2SearchRepository, times(1)).deleteById(table2.getId());
    }

    @Test
    @Transactional
    public void searchTable2() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        table2Repository.saveAndFlush(table2);
        when(mockTable2SearchRepository.search(queryStringQuery("id:" + table2.getId())))
            .thenReturn(Collections.singletonList(table2));

        // Search the table2
        restTable2MockMvc.perform(get("/api/_search/table-2-s?query=id:" + table2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(table2.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
}
