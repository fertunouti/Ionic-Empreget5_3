import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
   /* canActivate: [AuthGuard] //NÃO FUNCIONOU PERDE A ROTA*/ 
  },
  

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'cadastro-prestador',
    loadChildren: () => import('./pages/cadastro-prestador/cadastro-prestador.module').then( m => m.CadastroPrestadorPageModule)
  },
  {
    path: 'tipo-user',
    loadChildren: () => import('./pages/tipo-user/tipo-user.module').then( m => m.TipoUserPageModule)
  },
  {
    path: 'perfil-prestador',
    loadChildren: () => import('./pages/perfil-prestador/perfil-prestador.module').then( m => m.PerfilPrestadorPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./components/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'esqueci-senha',
    loadChildren: () => import('./pages/esqueci-senha/esqueci-senha.module').then( m => m.EsqueciSenhaPageModule)
  },
  {
    path: 'redefinir-senha',
    loadChildren: () => import('./pages/redefinir-senha/redefinir-senha.module').then( m => m.RedefinirSenhaPageModule)
  },   
  {
    path: 'os-view',
    loadChildren: () => import('./pages/os-view/os-view.module').then( m => m.OsViewPageModule)
  },
  {
    path: 'finalizar-os',
    loadChildren: () => import('./pages/finalizar-os/finalizar-os.module').then( m => m.FinalizarOsPageModule)
  },
  {
    path: 'agendamentos-prestador',
    loadChildren: () => import('./pages/agendamentos-prestador/agendamentos-prestador.module').then( m => m.AgendamentosPrestadorPageModule)
  },
  {
    path: 'gerenciar-perfil',
    loadChildren: () => import('./pages/gerenciar-perfil/gerenciar-perfil.module').then( m => m.GerenciarPerfilPageModule)
  },
  {
    path: 'historico-agendamentos',
    loadChildren: () => import('./pages/historico-agendamentos/historico-agendamentos.module').then( m => m.HistoricoAgendamentosPageModule)
  },
  {
    path: 'editar-cliente',
    loadChildren: () => import('./pages/editar-cliente/editar-cliente.module').then( m => m.EditarClientePageModule)
  },
  {
    path: 'editar-prestador',
    loadChildren: () => import('./pages/editar-prestador/editar-prestador.module').then( m => m.EditarPrestadorPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
    /* canActivate: [AuthGuard] //NÃO FUNCIONOU PERDE A ROTA*/
  },
  {
    path: 'tipo-user-home',
    loadChildren: () => import('./pages/tipo-user-home/tipo-user-home.module').then( m => m.TipoUserHomePageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./components/logout/logout.module').then( m => m.LogoutPageModule)
  },  {
    path: 'hello',
    loadChildren: () => import('./pages/hello/hello.module').then( m => m.HelloPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
