import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPrestadorPageRoutingModule } from './editar-prestador-routing.module';

import { EditarPrestadorPage } from './editar-prestador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPrestadorPageRoutingModule
  ],
  declarations: [EditarPrestadorPage]
})
export class EditarPrestadorPageModule {}
