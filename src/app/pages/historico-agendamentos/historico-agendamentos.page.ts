import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico-agendamentos',
  templateUrl: './historico-agendamentos.page.html',
  styleUrls: ['./historico-agendamentos.page.scss'],
})
export class HistoricoAgendamentosPage implements OnInit, OnDestroy, OnChanges {
  private osCadastradaSubscription: Subscription;
  private osCanceladaSubscription: Subscription;
  private osAceiteSubscription: Subscription
  private osRecusadaSubscription: Subscription
  //PAGINADOR
  currentPage: number = 0;
  totalPages!: number


  constructor(private apiService: ApiService, private eventService: EventService, private navCtrl: NavController,private router: Router) {
    this.osCadastradaSubscription = this.eventService.osCancelada$.subscribe(() => {
      this.getPedidosPageAndRefresh();
    });
    this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
      this.getPedidosPageAndRefresh();
    });
    
    this.osAceiteSubscription = this.eventService.osAceite$.subscribe(() => {
      this.getPedidosPageAndRefresh();
    });
    this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
      this.getPedidosPageAndRefresh();
    });
  }

  pedidos!: any
  tipoUser!: string

  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    this.getPedidosPageAndRefresh();
  }

  changePage(newPage: number) {
    this.apiService.addCurrentPage(newPage)
    this.currentPage = newPage;
    this.getPedidosPageAndRefresh()
  }

  ngOnDestroy(): void {
    this.osCadastradaSubscription.unsubscribe();
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.getPedidosPageAndRefresh()
  }

  private getPedidosPageAndRefresh() {
    this.apiService.getPedidosPage().subscribe(
      (data) => {
        this.pedidos = data;
        console.log('Pedidos no histórico de pedidos:', this.pedidos);
        this.totalPages = this.pedidos.totalPages
        console.log('quantidade paginas XXX=' + this.pedidos.totalPages)
        console.log("lista.pedidos.length =" + this.pedidos.conteudo.length)
         },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }

  onClick(id: number) {
    this.apiService.addId(id)
  }
  onClickInicio(){
    this.apiService.addCurrentPage(0)
    this.router.navigateByUrl('/hello');

  }
}
