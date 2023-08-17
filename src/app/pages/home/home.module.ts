import { PrestadorReadByRegionComponent } from './../../components/prestador-read-by-region/prestador-read-by-region.component';
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
import { HelloClienteComponent } from 'src/app/components/hello-cliente/hello-cliente.component';
import { BuscaNomeComponent } from 'src/app/components/busca-nome/busca-nome.component';
import { BuscaRegionComponent } from 'src/app/components/busca-region/busca-region.component';
import { HelloPage } from '../hello/hello.page';
import { CadastroPage } from '../cadastro/cadastro.page';
import { HistoricoAgendamentosPage } from '../historico-agendamentos/historico-agendamentos.page';
import { OsViewPage } from '../os-view/os-view.page';


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
  HelloClienteComponent,
  BuscaNomeComponent,
  BuscaRegionComponent,
  PrestadorReadByRegionComponent,
  HelloPage,
  HistoricoAgendamentosPage,
  OsViewPage

 

  
],
  exports:[
    LoginPage,
    HomePage,
    LoadingPage,
    HelloClienteComponent
  ]

})
export class HomePageModule {}
