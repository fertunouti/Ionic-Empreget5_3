import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
    private http: HttpClient,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  tipoUser!: string
  isLoggedIn!: boolean;
  clientes: any = {}
  dataAtualizacao!: string
  cliente = {
    id: null,
    nome: '',
    imgUrl : '',
    endereco: {
      logradouro: '',
      numero: null,
      complemento: '',
      cep: 'XXXXX-XXX',
      bairro: '',
      cidade: '',
      estado: '',
      pais: ''
    },
    rg: '',
    cpf: '',
    telefone: '',
  }

 ngOnInit() {
    console.log(this.apiService.readClienteId())
    this.tipoUser = this.apiService.getUserRole();
    this.isLoggedIn = this.apiService.readLoginStatus()
    this.apiService.getDataPerfisClientes().subscribe(
      (data) => {
        this.cliente = data[0];
        this.dataAtualizacao = data[0].dataDaAtualizacao

        console.log(this.cliente)
      },
      (error) => {
        console.error('Erro ao obter perfil dos prestadores:', error);
      }
    );
    


  }
  onClickSalvar() {
    const clienteEditado = {
      nome: this.cliente.nome,
      imgUrl: this.cliente.imgUrl,
      endereco: {
        logradouro: this.cliente.endereco.logradouro,
        numero: this.cliente.endereco.numero,
        complemento: this.cliente.endereco.complemento,
        cep: this.cliente.endereco.cep,
        bairro: this.cliente.endereco.bairro,
        cidade: this.cliente.endereco.cidade,
        estado: this.cliente.endereco.estado,
        pais: this.cliente.endereco.pais
      },
      rg: this.cliente.rg,
      cpf: this.cliente.cpf,
      telefone: this.cliente.telefone,
    }

  
    this.apiService.putEditarCliente(clienteEditado).subscribe(
      (response: any) => {
        console.log("Cadastro atualizado!");
        this.mostrarAlerta('Cadastro atualizado!');
        this.navCtrl.navigateBack('/hello');

      },

      (error) => {
        console.error("Erro ao cadastrar: ", error);
        this.mostrarAlerta('Erro no cadastro. Verifique os dados e tente novamente.');
        // Você pode adicionar mais tratamento de erro conforme necessário, como reverter as alterações, etc.
      }
    );
  }

  async mostrarAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
  onClickCancelar() {
    // this.apiService.setUserRole('');
    console.log(this.isLoggedIn)
    this.navCtrl.navigateBack('/hello');
  }


  validarFormatoRG(): boolean {
    const formatoValido = /^\d{1,9}$/.test(this.cliente.rg);
    if (!formatoValido) {
      this.mostrarAlerta('O valor do RG deve ter até 9 digitos');
    }
    return formatoValido;
  }


}


