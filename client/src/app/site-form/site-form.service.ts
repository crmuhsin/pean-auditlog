import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { urls } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class SiteFormService {

  commonOptions: any = {
    withCredentials: true,
    observe: "response",
  };

  constructor(private http: HttpClient, private auth: AuthService) { }

  setHeder() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": this.auth.getToken()
    });
    return headers
  }

  saveSiteData(payload: any) {
    let headers = this.setHeder()
    return this.http.post(urls.site_save, payload, { headers, observe: "response" }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateSiteData(payload: any) {
    let headers = this.setHeder()
    return this.http.post(urls.site_update, payload, { headers, observe: "response" }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getSiteData(payload: any) {
    let headers = this.setHeder()
    return this.http.post(urls.site_get_one, payload, { headers, observe: "response" }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAuditLog(payload: any) {
    let headers = this.setHeder()
    return this.http.post(urls.logs_get_all, payload, { headers, observe: "response" }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
