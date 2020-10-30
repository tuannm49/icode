package com.vnpt.icode.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vnpt.icode.web.rest.TestUtil;

public class Table1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Table1.class);
        Table1 table11 = new Table1();
        table11.setId(1L);
        Table1 table12 = new Table1();
        table12.setId(table11.getId());
        assertThat(table11).isEqualTo(table12);
        table12.setId(2L);
        assertThat(table11).isNotEqualTo(table12);
        table11.setId(null);
        assertThat(table11).isNotEqualTo(table12);
    }
}
