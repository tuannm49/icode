import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcodeTestModule } from '../../../test.module';
import { Table1DetailComponent } from 'app/entities/table-1/table-1-detail.component';
import { Table1 } from 'app/shared/model/table-1.model';

describe('Component Tests', () => {
  describe('Table1 Management Detail Component', () => {
    let comp: Table1DetailComponent;
    let fixture: ComponentFixture<Table1DetailComponent>;
    const route = ({ data: of({ table1: new Table1(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table1DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Table1DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Table1DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load table1 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.table1).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
