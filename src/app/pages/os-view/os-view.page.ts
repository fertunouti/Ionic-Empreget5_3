import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.page.html',
  styleUrls: ['./os-view.page.scss'],
})
export class OsViewPage implements OnInit, OnDestroy , OnChanges {
  
  private osCadastradaSubscription: Subscription;
  private osCanceladaSubscription: Subscription;
  private osAceiteSubscription: Subscription;
  private osRecusadaSubscription: Subscription;
  
  
  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private router: Router
  ) {
    this.osCadastradaSubscription = this.eventService.osCadastrada$.subscribe(() => {
         });
    this.osCanceladaSubscription = this.eventService.osCancelada$.subscribe(() => {
         });
    this.osAceiteSubscription = this.eventService.osAceite$.subscribe(() => {
         });
    this.osRecusadaSubscription = this.eventService.osRecusada$.subscribe(() => {
        });
  }

  tipoUser!: string
  idPedido!: number
  pedido!: any
  pedidos!: any
  

  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    this.idPedido = this.apiService.readId()
    this.getPedidosByIdAndRefresh()
    }

 ngOnChanges(changes: SimpleChanges): void {
  this.getPedidosPageAndRefresh()
 }

  ngOnDestroy() {
    // Cancelar a inscrição no observável para evitar vazamentos de memória
    this.osCadastradaSubscription.unsubscribe();
    this.osCanceladaSubscription.unsubscribe();
    this.osAceiteSubscription.unsubscribe();
    this.osRecusadaSubscription.unsubscribe();
  }
  
  //botão voltar
  onClickVoltar(){
    this.apiService.addCurrentPage(0) // reinicializa pagina atual para 0
    this.getPedidosPageAndRefresh() //atualiza página
  }
  //botão cancelarOS
  onClickCancelarOS() {
    this.cancelaOSAndRefresh()
  }
  //botão aceitarOS
  onClickAceitarOS() {
     this.aceitaOSAndRefresh()
  }
  //botão RecusarOS
  onClickRecusarOS() {
     this.recusaOSAndRefresh()
  }

  private cancelaOSAndRefresh() {
    this.apiService.putCancelarOS().subscribe(
      (data) => {
        console.log('Cancelado', data);
        this.getPedidosByIdAndRefresh()
        this.getPedidosPageAndRefresh();
        //Emite sinal de cancelado
        this.eventService.emitOSCancelada();
      },
      (error) => {
        console.error('Erro CANCELAR OS', error);
      }
    );
  }
  private aceitaOSAndRefresh() {
    this.apiService.putAceiteOS().subscribe(
      (data) => {
        console.log('Aceito pedido ' +data);
       
        this.getPedidosByIdAndRefresh();
        this.getPedidosPageAndRefresh();
        //Emite sinal de aceito
        this.eventService.emitOSAceite();
      },
      (error) => {
        console.error('Erro ACEITE OS', error);
      }
    );
  }
  private recusaOSAndRefresh() {
    this.apiService.putRecusarOS().subscribe(
      (data) => {
        console.log('Recusa OS ' +data);
        
      this.getPedidosByIdAndRefresh();
      this.getPedidosPageAndRefresh();
      //Emite sinal de cancelado
      this.eventService.emitOSRecusada();

      },
      
      (error) => {
        console.error('Erro ACEITE OS', error);
      }
    );
  }

  private getPedidosByIdAndRefresh() {
    this.apiService.getByIdPedido().subscribe(
      (data) => {
        this.pedido = data;
        console.log('////getPedidosByIdAndRefresh:', this.pedido);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }

private getPedidosPageAndRefresh() {
    this.apiService.getPedidosPage().subscribe(
      (data) => {
        this.pedidos = data;
        console.log('///getPedidosPageAndRefresh:', this.pedidos);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }
}


