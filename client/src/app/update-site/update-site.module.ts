import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateSiteComponent } from './update-site.component';
import { SiteFormModule } from '../site-form/site-form.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UpdateSiteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: UpdateSiteComponent,
      },
    ]),
    SiteFormModule
  ]
})
export class UpdateSiteModule { }
