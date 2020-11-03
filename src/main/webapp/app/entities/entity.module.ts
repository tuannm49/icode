import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'table-1',
        loadChildren: () => import('./table-1/table-1.module').then(m => m.IcodeTable1Module),
      },
      {
        path: 'table-2',
        loadChildren: () => import('./table-2/table-2.module').then(m => m.IcodeTable2Module),
      },
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.IcodePersonModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class IcodeEntityModule {}
