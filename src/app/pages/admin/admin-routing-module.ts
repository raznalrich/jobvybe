import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPortal } from './admin-portal/admin-portal';

const routes: Routes = [
  { path: '', component: AdminPortal },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
