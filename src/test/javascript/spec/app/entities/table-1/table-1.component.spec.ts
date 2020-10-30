import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcodeTestModule } from '../../../test.module';
import { Table1Component } from 'app/entities/table-1/table-1.component';
import { Table1Service } from 'app/entities/table-1/table-1.service';
import { Table1 } from 'app/shared/model/table-1.model';

describe('Component Tests', () => {
  describe('Table1 Management Component', () => {
    let comp: Table1Component;
    let fixture: ComponentFixture<Table1Component>;
    let service: Table1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table1Component],
      })
        .overrideTemplate(Table1Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Table1Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Table1Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Table1(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.table1s && comp.table1s[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
