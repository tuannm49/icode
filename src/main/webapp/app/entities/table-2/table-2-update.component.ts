import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITable2, Table2 } from 'app/shared/model/table-2.model';
import { Table2Service } from './table-2.service';

@Component({
  selector: 'jhi-table-2-update',
  templateUrl: './table-2-update.component.html',
})
export class Table2UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected table2Service: Table2Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ table2 }) => {
      this.updateForm(table2);
    });
  }

  updateForm(table2: ITable2): void {
    this.editForm.patchValue({
      id: table2.id,
      name: table2.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const table2 = this.createFromForm();
    if (table2.id !== undefined) {
      this.subscribeToSaveResponse(this.table2Service.update(table2));
    } else {
      this.subscribeToSaveResponse(this.table2Service.create(table2));
    }
  }

  private createFromForm(): ITable2 {
    return {
      ...new Table2(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITable2>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
