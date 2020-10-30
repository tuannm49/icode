import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITable1 } from 'app/shared/model/table-1.model';

type EntityResponseType = HttpResponse<ITable1>;
type EntityArrayResponseType = HttpResponse<ITable1[]>;

@Injectable({ providedIn: 'root' })
export class Table1Service {
  public resourceUrl = SERVER_API_URL + 'api/table-1-s';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/table-1-s';

  constructor(protected http: HttpClient) {}

  create(table1: ITable1): Observable<EntityResponseType> {
    return this.http.post<ITable1>(this.resourceUrl, table1, { observe: 'response' });
  }

  update(table1: ITable1): Observable<EntityResponseType> {
    return this.http.put<ITable1>(this.resourceUrl, table1, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITable1>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITable1[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITable1[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
