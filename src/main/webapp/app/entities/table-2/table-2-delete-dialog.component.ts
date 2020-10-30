import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITable2 } from 'app/shared/model/table-2.model';
import { Table2Service } from './table-2.service';

@Component({
  templateUrl: './table-2-delete-dialog.component.html',
})
export class Table2DeleteDialogComponent {
  table2?: ITable2;

  constructor(protected table2Service: Table2Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.table2Service.delete(id).subscribe(() => {
      this.eventManager.broadcast('table2ListModification');
      this.activeModal.close();
    });
  }
}
