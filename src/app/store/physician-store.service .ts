import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from 'src/app/store/store-state';

import { Physician } from '../models/physician.model';

@Injectable({
  providedIn: 'root'
})
export class PhysicianStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true });
  }

  clear() {
    this.setState({ physicians: undefined });
  }


  set(physicians: Physician[]) {
    this.setState({ physicians: physicians });
  }

  add(physician: Physician): void {

    const state = this.getState();

    let physicians = [];
    if (state && state.physicians) {
      physicians = state.physicians;
    } else {
      physicians = [];
    }

    physicians.push(physician);
    this.setState({ physicians: physicians });
  }

  update(physician: Physician): void {

    const state = this.getState();

    if (!state || !state.physicians) {
      this.setState({ physicians: [] });
    }

    const physicians = this.getState().physicians;

    const index = state.physicians.findIndex(a => a.userAccount.userAccountId === physician.userAccount.userAccountId);

    if (!index) {
      physicians.push(physician);
    } else {
      physicians[index] = physician;
    }

    this.setState({ physicians: physicians });
  }

  updateList(serverPhysicians: Physician[]): void {
    serverPhysicians.forEach(this.update);
  }

  get(id: number): Physician {

    const state = this.getState();

    if (!state || !state.physicians) {
      return undefined;
    }

    const physician = state.physicians.find(a => a.userAccount.userAccountId === id);

    return physician;
  }

  getList(ids: number[]): Physician[] {

    const state = this.getState();

    if (!state || !state.physicians) {
      return undefined;
    }

    const physicians: Physician[] = [];

    ids.forEach(id => {

      const physician = state.physicians.find(a => a.userAccount.userAccountId === id);

      if (physician) {
        physicians.push(physician);
      }

    });


    return physicians;
  }

  getAll(): Physician[] {
    const state = this.getState();

    if (!state) {
      return undefined;
    }

    return state.physicians;
  }
}
