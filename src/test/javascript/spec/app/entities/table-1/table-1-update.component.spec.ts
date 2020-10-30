import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IcodeTestModule } from '../../../test.module';
import { Table1UpdateComponent } from 'app/entities/table-1/table-1-update.component';
import { Table1Service } from 'app/entities/table-1/table-1.service';
import { Table1 } from 'app/shared/model/table-1.model';

describe('Component Tests', () => {
  describe('Table1 Management Update Component', () => {
    let comp: Table1UpdateComponent;
    let fixture: ComponentFixture<Table1UpdateComponent>;
    let service: Table1Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table1UpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(Table1UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Table1UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Table1Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Table1(123);
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
        const entity = new Table1();
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
