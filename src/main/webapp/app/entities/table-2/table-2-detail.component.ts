import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITable2 } from 'app/shared/model/table-2.model';

@Component({
  selector: 'jhi-table-2-detail',
  templateUrl: './table-2-detail.component.html',
})
export class Table2DetailComponent implements OnInit {
  table2: ITable2 | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ table2 }) => (this.table2 = table2));
  }

  previousState(): void {
    window.history.back();
  }
}
