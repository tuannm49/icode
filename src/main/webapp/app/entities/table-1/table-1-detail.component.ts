import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITable1 } from 'app/shared/model/table-1.model';

@Component({
  selector: 'jhi-table-1-detail',
  templateUrl: './table-1-detail.component.html',
})
export class Table1DetailComponent implements OnInit {
  table1: ITable1 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ table1 }) => (this.table1 = table1));
  }

  previousState(): void {
    window.history.back();
  }
}
