import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IcodeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { Table2DeleteDialogComponent } from 'app/entities/table-2/table-2-delete-dialog.component';
import { Table2Service } from 'app/entities/table-2/table-2.service';

describe('Component Tests', () => {
  describe('Table2 Management Delete Component', () => {
    let comp: Table2DeleteDialogComponent;
    let fixture: ComponentFixture<Table2DeleteDialogComponent>;
    let service: Table2Service;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcodeTestModule],
        declarations: [Table2DeleteDialogComponent],
      })
        .overrideTemplate(Table2DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Table2DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Table2Service);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
