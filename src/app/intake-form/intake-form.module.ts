import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignModule } from '../design/design.module';
import { AntiFungalRxOnlyComponent } from './anti-fungal-rx-only/anti-fungal-rx-only.component';
import { FootbathRxOnlyComponent } from './footbath-rx-only/footbath-rx-only.component';
import { GeneralDmeAndRxComponent } from './general-dme-and-rx/general-dme-and-rx.component';
import { GeneralDmeOnlyComponent } from './general-dme-only/general-dme-only.component';
import { GeneralRxOnlyComponent } from './general-rx-only/general-rx-only.component';
import { HeartburnAcidRxOnlyComponent } from './heartburn-acid-rx-only/heartburn-acid-rx-only.component';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { CreatePainDmeOnlyComponent } from './pain-dme-only/create/create-pain-dme-only.component';
import { EditPainDmeOnlyComponent } from './pain-dme-only/edit/edit-pain-dme-only.component';
import { PainDmeOnlyComponent } from './pain-dme-only/form/pain-dme-only.component';
import { PainRxOnlyComponent } from './pain-rx-only/pain-rx-only.component';
import { RashSkinRxOnlyComponent } from './rash-skin-rx-only/rash-skin-rx-only.component';
import { ScarRxOnlyComponent } from './scar-rx-only/scar-rx-only.component';

@NgModule({
  declarations: [
    GeneralRxOnlyComponent,
    GeneralDmeAndRxComponent,
    PainRxOnlyComponent,
    ScarRxOnlyComponent,
    HeartburnAcidRxOnlyComponent,
    RashSkinRxOnlyComponent,
    AntiFungalRxOnlyComponent,
    FootbathRxOnlyComponent,
    IntakeFormComponent,
    PainDmeOnlyComponent,
    GeneralDmeOnlyComponent,
    CreatePainDmeOnlyComponent,
    EditPainDmeOnlyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignModule
  ]
})
export class IntakeFormModule { }
