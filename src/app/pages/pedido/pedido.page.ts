import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { osPedido } from 'src/app/services/osPedido.model';
import { EventService } from 'src/app/services/event.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  constructor(private apiService: ApiService, private eventService: EventService, private alertController: AlertController) { }
  mostraCalendarioOnClick = false; // Inicialmente oculto
  selectedDate!: string; // Armazena a data escolhida
  perfilPrestador!: any
  perfilCliente!: any
  pedidos!:any

  dataPedido!: string
  osPedido: osPedido = {
    prestador: {
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
  onClick() {
    this.osPedido.prestador.id = this.apiService.readId()
    this.osPedido.dataServico = this.dataPedido.toString().split('T')[0]
    console.log("Id Prestador = " + this.osPedido.prestador.id)
    console.log("data do Serviço = " + this.osPedido.dataServico)
    console.log(typeof this.osPedido.dataServico)
    console.log("Periodo = " + this.osPedido.periodo)
    console.log("tipo Diaria= " + this.osPedido.tipoDeDiaria)
     this.apiService.postPedido(this.osPedido).subscribe(
       (response: any) => {
         console.log("pedido cadastrado com sucesso!!!");
         this.getPedidosPageAndRefresh()
         // Após cadastrar com sucesso, emita o evento
         this.eventService.emitOSCadastrada();
       },

       (error: any) => {
         console.error("Erro ao cadastrar pedido:", error);
         if (error && error.error && error.error.userMessage) {
           // Exibir mensagem de erro
           this.exibirAlertaErro(error.error.userMessage);
         } else {
           this.exibirAlertaErro("Ocorreu um erro ao cadastrar o pedido.");
         }
       }
     )

    //.split('/').reverse().join('-')

  }
  async exibirAlertaErro(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
  //  // Método chamado ao clicar no ícone de calendário
  mostraCalendario() {
    this.mostraCalendarioOnClick = !this.mostraCalendarioOnClick;
  }

  // // Método para definir a data escolhida
   onDateSelected(event: any) {
    
    this.dataPedido = event.dataEscolhida
    //.toISOString().split('T')[0]; // Captura a parte da data
    console.log(typeof this.dataPedido)
   
   }

  // Método para fechar o calendário
  fechaCalendario() {
    this.mostraCalendarioOnClick = false;
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


