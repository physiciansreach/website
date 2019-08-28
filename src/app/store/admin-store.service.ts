import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from 'src/app/store/store-state';

import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true });
  }

  clear() {
    this.setState({ admins: undefined });
  }

  set(admins: Admin[]) {
    this.setState({ admins: admins });
  }

  add(admin: Admin): void {

    const state = this.getState();

    let admins = [];
    if (state && state.admins) {
      admins = state.admins;
    } else {
      admins = [];
    }

    admins.push(admin);
    this.setState({ admins: admins });
  }

  update(admin: Admin): void {

    const state = this.getState();

    if (!state || !state.admins) {
      this.setState({ admins: [] });
    }

    const admins = this.getState().admins;

    const index = admins.findIndex(a => a.userAccount.userAccountId === admin.userAccount.userAccountId);
    admins[index] = admin;

    this.setState({ admins: admins });
  }

  get(id: number): Admin {

    const state = this.getState();

    if (!state || !state.admins) {
      return undefined;
    }

    const admin = state.admins.find(a => a.userAccount.userAccountId === id);

    return admin;
  }

  getAll(): Admin[] {
    const state = this.getState();

    if (!state) {
      return undefined;
    }

    return state.admins;
  }
}
