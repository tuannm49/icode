import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITable2, Table2 } from 'app/shared/model/table-2.model';
import { Table2Service } from './table-2.service';
import { Table2Component } from './table-2.component';
import { Table2DetailComponent } from './table-2-detail.component';
import { Table2UpdateComponent } from './table-2-update.component';

@Injectable({ providedIn: 'root' })
export class Table2Resolve implements Resolve<ITable2> {
  constructor(private service: Table2Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITable2> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((table2: HttpResponse<Table2>) => {
          if (table2.body) {
            return of(table2.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Table2());
  }
}

export const table2Route: Routes = [
  {
    path: '',
    component: Table2Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Table2DetailComponent,
    resolve: {
      table2: Table2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Table2UpdateComponent,
    resolve: {
      table2: Table2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Table2UpdateComponent,
    resolve: {
      table2: Table2Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table2.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
