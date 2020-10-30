import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITable1 } from 'app/shared/model/table-1.model';
import { Table1Service } from './table-1.service';

@Component({
  templateUrl: './table-1-delete-dialog.component.html',
})
export class Table1DeleteDialogComponent {
  table1?: ITable1;

  constructor(protected table1Service: Table1Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.table1Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('table1ListModification');
      this.activeModal.close();
    });
  }
}
