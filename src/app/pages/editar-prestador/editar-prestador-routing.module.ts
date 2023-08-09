import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPrestadorPage } from './editar-prestador.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPrestadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPrestadorPageRoutingModule {}
