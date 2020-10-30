import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcodeSharedModule } from 'app/shared/shared.module';
import { Table1Component } from './table-1.component';
import { Table1DetailComponent } from './table-1-detail.component';
import { Table1UpdateComponent } from './table-1-update.component';
import { Table1DeleteDialogComponent } from './table-1-delete-dialog.component';
import { table1Route } from './table-1.route';

@NgModule({
  imports: [IcodeSharedModule, RouterModule.forChild(table1Route)],
  declarations: [Table1Component, Table1DetailComponent, Table1UpdateComponent, Table1DeleteDialogComponent],
  entryComponents: [Table1DeleteDialogComponent],
})
export class IcodeTable1Module {}
