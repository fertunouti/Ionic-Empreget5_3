import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsViewPageRoutingModule } from './os-view-routing.module';

import { OsViewPage } from './os-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsViewPageRoutingModule
  ],
  declarations: [OsViewPage]
})
export class OsViewPageModule {}
