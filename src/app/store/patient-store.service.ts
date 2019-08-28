import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { StoreState } from 'src/app/store/store-state';

import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientStoreService extends ObservableStore<StoreState> {

  constructor() {
    super({ trackStateHistory: true });
  }

  clear() {
    this.setState({ patients: undefined });
  }

  set(patients: Patient[]) {
    this.setState({ patients: patients });
  }

  add(patient: Patient): void {

    const state = this.getState();

    let patients = [];
    if (state && state.patients) {
      patients = state.patients;
    } else {
      patients = [];
    }

    patients.push(patient);
    this.setState({ patients: patients });
  }

  update(patient: Patient): void {

    const state = this.getState();

    if (!state || !state.patients) {
      this.setState({ patients: [] });
    }

    const patients = this.getState().patients;

    const index = state.patients.findIndex(a => a.patientId === patient.patientId);

    if (!index) {
      patients.push(patient);
    } else {
      patients[index] = patient;
    }

    this.setState({ patients: patients });


  }

  updateList(serverPatients: Patient[]): void {
    serverPatients.forEach(this.update);
  }


  get(id: number): Patient {

    const state = this.getState();

    if (!state || !state.patients) {
      return undefined;
    }

    const patient = state.patients.find(a => a.patientId === id);

    return patient;
  }

  getAll(): Patient[] {
    const state = this.getState();

    if (!state) {
      return undefined;
    }

    return state.patients;
  }

  getList(ids: number[]): Patient[] {

    const state = this.getState();

    if (!state || !state.patients) {
      return undefined;
    }

    const patients: Patient[] = [];

    ids.forEach(id => {

      const patient = state.patients.find(a => a.patientId === id);

      if (patient) {
        patients.push(patient);
      }

    });


    return patients;
  }
}
