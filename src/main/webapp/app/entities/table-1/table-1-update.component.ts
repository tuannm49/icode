import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITable1, Table1 } from 'app/shared/model/table-1.model';
import { Table1Service } from './table-1.service';

@Component({
  selector: 'jhi-table-1-update',
  templateUrl: './table-1-update.component.html',
})
export class Table1UpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected table1Service: Table1Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ table1 }) => {
      this.updateForm(table1);
    });
  }

  updateForm(table1: ITable1): void {
    this.editForm.patchValue({
      id: table1.id,
      name: table1.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const table1 = this.createFromForm();
    if (table1.id !== undefined) {
      this.subscribeToSaveResponse(this.table1Service.update(table1));
    } else {
      this.subscribeToSaveResponse(this.table1Service.create(table1));
    }
  }

  private createFromForm(): ITable1 {
    return {
      ...new Table1(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITable1>>): void {
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
