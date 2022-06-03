import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteFormComponent } from './site-form.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SiteFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    SiteFormComponent
  ]
})
export class SiteFormModule { }
