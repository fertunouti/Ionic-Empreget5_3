import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';


@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.page.html',
  styleUrls: ['./os-view.page.scss'],
})
export class OsViewPage implements OnInit {
  

  constructor(private apiService:ApiService) { 
    
  }
  tipoUser!: string
  idPedido!: number
  pedido!: any
  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
    this.idPedido = this.apiService.readId()
    this.getPedidosAndRefresh()
 
 
  }
  dado!: any
  onClickCancelarOS(){
    this.apiService.addId(this.idPedido)
    
    
     this.apiService.putCancelarOS().subscribe(
      (data) => {
         console.log('Cacelado',data);
       },
      (error) => {
        console.error('Erro CANCELAR OS', error);
      }
    );
  }

  private getPedidosAndRefresh() {
    this.apiService.getByIdPedido().subscribe(
      (data) => {
        this.pedido = data;
        console.log('Pedidos no histórico de pedidos:', this.pedido);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }
  // private getCancelAndRefresh() {
  //   this.apiService.putCancelarOS().subscribe(
  //      (data) => {
  //        this.pedido = data;
  //        console.log('Pedidos no histórico de pedidos:', this.pedido);
  //      },
  //     (error) => {
  //       console.error('Erro CANCELAR OS', error);
  //     }
  //   );
  }




