import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITable2 } from 'app/shared/model/table-2.model';

type EntityResponseType = HttpResponse<ITable2>;
type EntityArrayResponseType = HttpResponse<ITable2[]>;

@Injectable({ providedIn: 'root' })
export class Table2Service {
  public resourceUrl = SERVER_API_URL + 'api/table-2-s';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/table-2-s';

  constructor(protected http: HttpClient) {}

  create(table2: ITable2): Observable<EntityResponseType> {
    return this.http.post<ITable2>(this.resourceUrl, table2, { observe: 'response' });
  }

  update(table2: ITable2): Observable<EntityResponseType> {
    return this.http.put<ITable2>(this.resourceUrl, table2, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITable2>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITable2[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITable2[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
