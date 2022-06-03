import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import data from '../../assets/au.json';
import { SiteFormService } from './site-form.service';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {

  @Input() isUpdate: boolean;
  logList: any[] = [];
  siteId: string;
  regionControl = new FormControl();
  options: any[] = data;
  filteredOptions: Observable<any[]>;
  siteForm: FormGroup;
  isFormFilled = false;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private formService: SiteFormService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.siteId = params["site_id"];
      if (this.siteId) {
        this.getSiteData()
        this.getAuditLog()
      } else {
        this.initSiteForm({})
      }
    });
    this.filteredOptions = this.regionControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.city.toLowerCase().includes(filterValue));
  }

  initSiteForm(data: any) {
    this.siteForm = this.fb.group({
      name: [data ? data.name : "", [Validators.required]],
      description: [data ? data.description : "", [Validators.required]],
      latitude: [data ? data.latitude : "", [Validators.required]],
      longitude: [data ? data.longitude : "", [Validators.required]]
    });
    this.siteForm.valueChanges.subscribe((formData) => {
      this.isFormFilled = formData.name && formData.description && formData.latitude && formData.longitude;
    });
    this.regionControl.setValue(data.jurisdiction || "")
  }

  processSite () {
    if (this.isUpdate && this.siteId) {
      this.updateSite()
    } else {
      this.saveSite()
    }
  }

  getSiteData() {
    this.isLoading = true;
    const payload = {
      site_id: this.siteId
    };
    this.formService.getSiteData(payload).subscribe((res) => {
      if (res && res.status == 200) {
        this.isLoading = false;
        this.initSiteForm(res.body)
      }
    });
  }

  getAuditLog() {
    const payload = {
      site_id: this.siteId
    };
    this.formService.getAuditLog(payload).subscribe((res) => {
      if (res && res.status == 200) {
        this.logList = res.body.rows;
        console.log(this.logList);
        
      }
    });
  }

  saveSite() {
    if (!this.isFormFilled || !this.regionControl.value) {
      return
    }
    this.isLoading = true;
    const payload = {
      name: this.siteForm.value.name,
      jurisdiction: this.regionControl.value,
      description: this.siteForm.value.description,
      latitude: this.siteForm.value.latitude,
      longitude: this.siteForm.value.longitude,
    };
    this.formService.saveSiteData(payload).subscribe((res) => {
      if (res && res.status == 200) {
        this.isLoading = false;
        this.gotoList()
      }
    });
  }

  updateSite() {
    if (!this.isFormFilled || !this.regionControl.value) {
      return
    }
    this.isLoading = true;
    const payload = {
      site_id: this.siteId,
      name: this.siteForm.value.name,
      jurisdiction: this.regionControl.value,
      description: this.siteForm.value.description,
      latitude: this.siteForm.value.latitude,
      longitude: this.siteForm.value.longitude,
    };
    this.formService.updateSiteData(payload).subscribe((res) => {
      if (res && res.status == 200) {
        this.isLoading = false;
        this.gotoList()
      }
    });
  }

  gotoList(){
    this.router.navigateByUrl(`/list`);
  }
}
