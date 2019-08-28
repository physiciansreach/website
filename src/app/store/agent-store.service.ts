import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from 'src/app/store/store-state';

import { Agent } from '../models/Agent.model';


@Injectable({
  providedIn: 'root'
})
export class AgentStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true });
  }

  clear() {
    this.setState({ agents: undefined });
  }

  set(agents: Agent[]) {
    this.setState({ agents: agents });
  }

  add(agent: Agent): void {

    const state = this.getState();

    let agents = [];
    if (state && state.agents) {
      agents = state.agents;
    } else {
      agents = [];
    }

    agents.push(agent);
    this.setState({ agents: agents });
  }

  update(agent: Agent): void {

    const state = this.getState();

    if (!state || !state.agents) {
      this.setState({ agents: [] });
    }

    const agents = this.getState().agents;

    const index = agents.findIndex(a => a.userAccount.userAccountId === agent.userAccount.userAccountId);
    agents[index] = agent;

    this.setState({ agents: agents });
  }

  get(id: number): Agent {

    const state = this.getState();

    if (!state || !state.agents) {
      return undefined;
    }

    const agent = state.agents.find(a => a.userAccount.userAccountId === id);

    return agent;
  }

  getAll(): Agent[] {
    const state = this.getState();

    if (!state) {
      return undefined;
    }

    return state.agents;
  }
}
