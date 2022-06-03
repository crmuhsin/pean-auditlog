import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { TableDataSource, TableItem } from './table-datasource';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['id', 'name', 'jurisdiction', 'latitude', 'longitude', 'created', 'action'];
  dataSource: TableDataSource | null;
  data: TableItem[] = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _httpClient: HttpClient, private auth: AuthService) { }

  ngAfterViewInit() {
    this.dataSource = new TableDataSource(this._httpClient, this.auth);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataSource!.getSites(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((res: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (res === null) {
            return [];
          }

          return res.body.rows;
        }),
      )
      .subscribe(data => (this.data = data));
    this.dataSource.getSiteCount().subscribe(
      (response: any) => {
        this.resultsLength = response.body.rows[0].count;
      }
    );
  }
}
