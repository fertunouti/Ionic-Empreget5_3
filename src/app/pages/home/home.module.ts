

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ReadPrestadorComponent } from '../../components/read-prestador/read-prestador.component';

import { LoginPage } from '../login/login.page';
import { LoadingPage } from '../../components/loading/loading.page';
import { LogoutPage } from '../../components/logout/logout.page';
import { HelloPrestadorComponent } from 'src/app/components/hello-prestador/hello-prestador.component';
import { HelloAdministradorComponent } from 'src/app/components/hello-administrador/hello-administrador.component';
import { ReadUsuariosComponent } from 'src/app/components/read-usuarios/read-usuarios.component';
import { PrestadorReadByNameComponent } from 'src/app/components/prestador-read-by-name/prestador-read-by-name.component';

import { BuscaNomeComponent } from 'src/app/components/busca-nome/busca-nome.component';
import { BuscaRegionComponent } from 'src/app/components/busca-region/busca-region.component';
import { HelloPage } from '../hello/hello.page';
import { CadastroPage } from '../cadastro/cadastro.page';
import { HistoricoAgendamentosPage } from '../historico-agendamentos/historico-agendamentos.page';
import { OsViewPage } from '../os-view/os-view.page';
import { CalendarioComponent } from './../../components/calendario/calendario.component';
import { PrestadorReadByRegionComponent } from './../../components/prestador-read-by-region/prestador-read-by-region.component';
import { PedidoPage } from '../pedido/pedido.page';
import { AgendamentosPrestadorPage } from '../agendamentos-prestador/agendamentos-prestador.page';
import { HelloClienteComponent } from 'src/app/components/hello-cliente/hello-cliente.component';
import { PesquisaPrestadorPage } from '../pesquisa-prestador/pesquisa-prestador.page';
import { PaginacaoComponent } from 'src/app/components/paginacao/paginacao.component';
import { StarRatingComponent } from 'src/app/components/star-rating/star-rating.component';
import { AvaliacaoPage } from '../avaliacao/avaliacao.page';
import { PerfilPrestadorPage } from '../perfil-prestador/perfil-prestador.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    
    

  ],
  declarations: [
  HomePage,
  ReadPrestadorComponent,
  LoginPage,
  LoadingPage,
  LogoutPage,
  HelloPrestadorComponent,
  HelloAdministradorComponent,
  ReadUsuariosComponent,
  PrestadorReadByNameComponent,
  
  BuscaNomeComponent,
  BuscaRegionComponent,
  PrestadorReadByRegionComponent,
  HelloPage,
  HistoricoAgendamentosPage,
  OsViewPage,
  CalendarioComponent,
  CadastroPage,
  PedidoPage,
  AgendamentosPrestadorPage,
  HelloClienteComponent,
  PesquisaPrestadorPage,
  PaginacaoComponent,
  StarRatingComponent,
  AvaliacaoPage,
  PerfilPrestadorPage


 
 
  
],
  exports:[
    LoginPage,
    HomePage,
    LoadingPage,
    PaginacaoComponent
    
  ]

})
export class HomePageModule {}
