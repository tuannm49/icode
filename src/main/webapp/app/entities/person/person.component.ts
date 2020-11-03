import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { PersonDeleteDialogComponent } from './person-delete-dialog.component';

@Component({
  selector: 'jhi-person',
  templateUrl: './person.component.html',
})
export class PersonComponent implements OnInit, OnDestroy {
  persons?: IPerson[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected personService: PersonService,
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
    

    this.personService.query().subscribe((res: HttpResponse<IPerson[]>) => (this.persons = res.body || []));
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

  trackId(index: number, item: IPerson): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTable1s(): void {
    this.eventSubscriber = this.eventManager.subscribe('personListModification', () => this.loadAll());
  }

  delete(person: IPerson): void {
    const modalRef = this.modalService.open(PersonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.person = person;
  }
}
