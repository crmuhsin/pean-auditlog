import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule
    ],
    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatPaginatorModule
    ],
})
export class MaterialModule { }
