import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteListComponent } from './site-list.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    SiteListComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SiteListComponent,
      },
    ]),
    MaterialModule
  ]
})
export class SiteListModule { }
