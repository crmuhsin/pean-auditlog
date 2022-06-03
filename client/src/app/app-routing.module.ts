import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: "list",
    canActivate: [AuthGuard],
    loadChildren: () =>
    import("./site-list/site-list.module").then(
        (m) => m.SiteListModule
      ),
  },
  {
    path: "create",
    canActivate: [AuthGuard],
    loadChildren: () =>
    import("./create-site/create-site.module").then(
        (m) => m.CreateSiteModule
      ),
    },
  {
    path: "update/:site_id",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./update-site/update-site.module").then(
        (m) => m.UpdateSiteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
