import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcodeTestModule } from '../../../test.module';
import { Table2Component } from 'app/entities/table-2/table-2.component';
import { Table2Service } from 'app/entities/table-2/table-2.service';
import { Table2 } from 'app/shared/model/table-2.model';

describe('Component Tests', () => {
  describe('Table2 Management Component', () => {
    let comp: Table2Component;
    let fixture: ComponentFixture<Table2Component>;
    let service: Table2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table2Component],
      })
        .overrideTemplate(Table2Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Table2Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Table2Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Table2(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.table2s && comp.table2s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
