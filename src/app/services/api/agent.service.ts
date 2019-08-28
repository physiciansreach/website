import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AgentStoreService } from 'src/app/store/agent-store.service';

import { environment } from '../../../environments/environment';
import { Agent } from '../../models/Agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private url = `${environment.api_url}/agent`;

  constructor(
    private readonly http: HttpClient,
    private readonly store: AgentStoreService) {
  }

  getAll(): Observable<Agent[]> {

    const agents = this.store.getAll();

    if (agents) {
      return of(agents);
    }

    return this.http
      .get<Agent[]>(this.url)
      .pipe(tap((data: Agent[]) => this.store.set(data)));
  }

  get(id: number): Observable<Agent> {

    const agent = this.store.get(id);

    if (agent) {
      return of(agent);
    }

    return this.http
      .get<Agent>(`${this.url}/${id}`)
      .pipe(tap((data: Agent) => this.store.add(data)));
  }

  post(agent: Agent): Observable<Agent> {
    return this.http
      .post<Agent>(this.url, agent)
      .pipe(tap((data: Agent) => this.store.add(data)));
  }

  put(id: number, agent: Agent): Observable<{ agentId: number }> {
    return this.http
      .put<{ agentId: number }>(`${this.url}/${id}`, agent)
      .pipe(tap(() => this.store.update(agent)));
  }
}
