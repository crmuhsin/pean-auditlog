import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { urls } from '../../shared/constant';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

export interface TableItem {
  id: number;
  name: string;
  jurisdiction: string;
  latitude: string;
  longitude: string;
}

@Injectable()
export class TableDataSource {

  constructor(private http: HttpClient, private auth: AuthService) { }

  setHeder() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.auth.getToken()
    });
    return headers
  }

  getSites(page_number: number, page_size: number) {
    let headers = this.setHeder()
    let body = {
      page_size, page_number
    }
    return this.http.post(urls.site_get_all, body, { headers, observe: "response" })
  }

  getSiteCount() {
    let headers = this.setHeder()
    return this.http.post(urls.site_get_total_count, {}, { headers, observe: "response" }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
