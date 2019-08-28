import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    TextMaskModule
  ],
  exports: [
    FlexLayoutModule,
    MaterialModule,
    TextMaskModule
  ]
})
export class DesignModule { }
