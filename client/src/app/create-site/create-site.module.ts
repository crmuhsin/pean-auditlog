import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSiteComponent } from './create-site.component';
import { SiteFormModule } from '../site-form/site-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateSiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: CreateSiteComponent,
      },
    ]),
    SiteFormModule
  ]
})
export class CreateSiteModule { }
