import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcodeTestModule } from '../../../test.module';
import { Table2DetailComponent } from 'app/entities/table-2/table-2-detail.component';
import { Table2 } from 'app/shared/model/table-2.model';

describe('Component Tests', () => {
  describe('Table2 Management Detail Component', () => {
    let comp: Table2DetailComponent;
    let fixture: ComponentFixture<Table2DetailComponent>;
    const route = ({ data: of({ table2: new Table2(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table2DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(Table2DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Table2DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load table2 on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.table2).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
