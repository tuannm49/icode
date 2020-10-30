import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITable1, Table1 } from 'app/shared/model/table-1.model';
import { Table1Service } from './table-1.service';
import { Table1Component } from './table-1.component';
import { Table1DetailComponent } from './table-1-detail.component';
import { Table1UpdateComponent } from './table-1-update.component';

@Injectable({ providedIn: 'root' })
export class Table1Resolve implements Resolve<ITable1> {
  constructor(private service: Table1Service, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITable1> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((table1: HttpResponse<Table1>) => {
          if (table1.body) {
            return of(table1.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Table1());
  }
}

export const table1Route: Routes = [
  {
    path: '',
    component: Table1Component,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: Table1DetailComponent,
    resolve: {
      table1: Table1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: Table1UpdateComponent,
    resolve: {
      table1: Table1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: Table1UpdateComponent,
    resolve: {
      table1: Table1Resolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'icodeApp.table1.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
