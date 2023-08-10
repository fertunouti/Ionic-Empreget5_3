import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { osPedido } from 'src/app/services/osPedido.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(private apiService:ApiService) { }
  perfilPrestador!:any  
  perfilCliente!: any

  dataPedido!: string
  osPedido : osPedido = {
    prestador : {
      id: null
    },
    dataServico: "", 
    periodo: "",
    tipoDeDiaria: ""
  }

  ngOnInit() {
    this.apiService.getPerfisPrestadoresById().subscribe(
      (data) => {
         this.perfilPrestador = data;
        console.log('Prestador no pedido:', this.perfilPrestador);
       },
      (error) => {
         console.error('Erro ao obter perfil dos prestadores:', error);
       }
      );
    this.apiService.getDataPerfisClientes().subscribe(
      (data) => {
         this.perfilCliente = data;
        console.log('Cliente no pedido:', this.perfilCliente);
       },
      (error) => {
         console.error('Erro ao obter perfil dos prestadores:', error);
       }
      );
      }
  onClick(){
    this.osPedido.prestador.id = this.apiService.readId()
    this.osPedido.dataServico = this.osPedido.dataServico.split('/').reverse().join('-')
    console.log ("Id Prestador = " + this.osPedido.prestador.id)
    console.log ("data do Serviço = " + this.osPedido.dataServico)
    console.log ("Periodo = " + this.osPedido.periodo)
    console.log ("tipo Diaria= "+this.osPedido.tipoDeDiaria)
    this.apiService.postPedido(this.osPedido).subscribe(
      (response: any) => { console.log("pedido cadastrado com sucesso!!!")})


  }

}


