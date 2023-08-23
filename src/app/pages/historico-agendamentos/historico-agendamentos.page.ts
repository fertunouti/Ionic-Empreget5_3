import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-historico-agendamentos',
  templateUrl: './historico-agendamentos.page.html',
  styleUrls: ['./historico-agendamentos.page.scss'],
})
export class HistoricoAgendamentosPage implements OnInit, OnDestroy, OnChanges {
  private pedidoCadastradoSubscription: Subscription;
  private osCanceladaSubscription: Subscription;
  private osAceiteSubscription: Subscription
private osRecusadaSubscription:Subscription
//PAGINADOR
currentPage: number = 0; // Defina o valor atual da página
itemsPerPage: number = 3; // Defina o a quantidade de itens por página
listaPedidosPorPagina : any[] =[]


  constructor(private apiService:ApiService, private eventService: EventService, private navCtrl: NavController) { 
    this.pedidoCadastradoSubscription = this.eventService.osCancelada$.subscribe(() => {
      this.getPedidosAndRefresh();
    });
    this.osCanceladaSubscription = this.eventService.osCadastrado$.subscribe(() => {
      this.getPedidosAndRefresh();
    });
    this.osAceiteSubscription = this.eventService.osAceite$.subscribe(() => {
      this.getPedidosAndRefresh();
    });
      this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
         this.getPedidosAndRefresh();
    });
   
    
  }
 
 pedidos!: any
 tipoUser!: string

  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    
      this.getPedidosAndRefresh();
        
  }

  splitPedidosPorPaginas() {
    for (let i = 0; i < this.pedidos.conteudo.length; i += this.itemsPerPage) {
      this.listaPedidosPorPagina.push(this.pedidos.conteudo.slice(i, i + this.itemsPerPage));
    }
  }

  changePage(newPage: number) {
    this.currentPage = newPage;
    }
  get totalPages() {
      return this.listaPedidosPorPagina.length;
    }



  ngOnDestroy(): void {
    this.pedidoCadastradoSubscription.unsubscribe();
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
   
  }
  ngOnChanges(): void {
    this.pedidoCadastradoSubscription.unsubscribe();
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
     }

  private getPedidosAndRefresh() {
    this.apiService.getPedidos().subscribe(
      (data) => {
        this.pedidos = data;
        console.log('Pedidos no histórico de pedidos:', this.pedidos);
        //DIVIDE EM PEDIDO EM VÁRIAS PAGINAS
        for (let i = 0; i < this.pedidos.conteudo.length; i += this.itemsPerPage) {
          this.listaPedidosPorPagina.push(this.pedidos.conteudo.slice(i, i + this.itemsPerPage));
        }
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }

  
  onClick(id:number){
    this.apiService.addId(id) }

 
      
  

}
