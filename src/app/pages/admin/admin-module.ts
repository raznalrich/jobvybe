
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminPortal } from './admin-portal/admin-portal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminPortal
  ]
})
export class AdminModule { }
