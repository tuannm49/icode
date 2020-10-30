import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcodeSharedModule } from 'app/shared/shared.module';
import { Table2Component } from './table-2.component';
import { Table2DetailComponent } from './table-2-detail.component';
import { Table2UpdateComponent } from './table-2-update.component';
import { Table2DeleteDialogComponent } from './table-2-delete-dialog.component';
import { table2Route } from './table-2.route';

@NgModule({
  imports: [IcodeSharedModule, RouterModule.forChild(table2Route)],
  declarations: [Table2Component, Table2DetailComponent, Table2UpdateComponent, Table2DeleteDialogComponent],
  entryComponents: [Table2DeleteDialogComponent],
})
export class IcodeTable2Module {}
