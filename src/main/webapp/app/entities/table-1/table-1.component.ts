import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITable1 } from 'app/shared/model/table-1.model';
import { Table1Service } from './table-1.service';
import { Table1DeleteDialogComponent } from './table-1-delete-dialog.component';

@Component({
  selector: 'jhi-table-1',
  templateUrl: './table-1.component.html',
})
export class Table1Component implements OnInit, OnDestroy {
  table1s?: ITable1[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected table1Service: Table1Service,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.table1Service
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITable1[]>) => (this.table1s = res.body || []));
      return;
    }

    this.table1Service.query().subscribe((res: HttpResponse<ITable1[]>) => (this.table1s = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTable1s();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITable1): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTable1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('table1ListModification', () => this.loadAll());
  }

  delete(table1: ITable1): void {
    const modalRef = this.modalService.open(Table1DeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.table1 = table1;
  }
}
