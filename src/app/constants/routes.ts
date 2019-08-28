export const RouteUrls = {
  BillingDashboardComponent: 'billing',

  VendorIntakeDocumentComponent: 'vendor/:vendorId/intake-document/:intakeFormId',
  PhysicianIntakeDocumentComponent: 'physician/:physicianId/intake-document/:intakeFormId',

  AgentDashboardComponent: 'agent',

  PatientCreateComponent: 'agent/:agentId/patient',
  PatientEditComponent: 'agent/:agentId/patient/:patientId',

  CreatePainDmeOnlyComponent: 'patient/:patientId/pain-dme-only',
  EditPainDmeOnlyComponent: 'patient/:patientId/pain-dme-only/:intakeFormId/edit',

  PhysicianDashboardComponent: 'physician',

  VendorViewComponent: 'vendor/:id/view'
};
