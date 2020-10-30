package com.vnpt.icode.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.vnpt.icode.web.rest.TestUtil;

public class Table2Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Table2.class);
        Table2 table21 = new Table2();
        table21.setId(1L);
        Table2 table22 = new Table2();
        table22.setId(table21.getId());
        assertThat(table21).isEqualTo(table22);
        table22.setId(2L);
        assertThat(table21).isNotEqualTo(table22);
        table21.setId(null);
        assertThat(table21).isNotEqualTo(table22);
    }
}
