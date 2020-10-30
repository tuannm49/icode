import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcodeTestModule } from '../../../test.module';
import { Table2UpdateComponent } from 'app/entities/table-2/table-2-update.component';
import { Table2Service } from 'app/entities/table-2/table-2.service';
import { Table2 } from 'app/shared/model/table-2.model';

describe('Component Tests', () => {
  describe('Table2 Management Update Component', () => {
    let comp: Table2UpdateComponent;
    let fixture: ComponentFixture<Table2UpdateComponent>;
    let service: Table2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table2UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Table2UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Table2UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Table2Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Table2(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Table2();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
