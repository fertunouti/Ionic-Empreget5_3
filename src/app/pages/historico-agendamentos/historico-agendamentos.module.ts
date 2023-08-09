import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoAgendamentosPageRoutingModule } from './historico-agendamentos-routing.module';

import { HistoricoAgendamentosPage } from './historico-agendamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoAgendamentosPageRoutingModule
  ],
  declarations: [HistoricoAgendamentosPage]
})
export class HistoricoAgendamentosPageModule {}
