import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Clientes } from 'src/app/services/cliente.model';
import { ApiService } from 'src/app/services/apiService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {

  constructor(private apiService: ApiService, private alertController: AlertController) {
  }
  @ViewChild('senhaInput') senhaInput: any; // Referência ao campo de senha

  prefixo: string = ''
  senhaRepetida: string = '';

  cliente: Clientes = {
    nome: '',
    imgUrl: null,
    endereco: {
      logradouro: '',
      numero: null,
      complemento: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: ''
    },
    rg: '',
    cpf: '',
    telefone: '',
    usuario: {
      email: '',
      senha: '',
      role: ''
    }

  }

  ngOnInit() {


  }
  onClick() {
    if (this.validarSenhas()) {
      this.cliente.usuario.role = this.apiService.getUserRole()
      this.cliente.endereco.logradouro = this.prefixo + " " + this.cliente.endereco.logradouro


      this.apiService.postCadastrarCliente(this.cliente).subscribe(
        (response: any) => { console.log("CLIENTE cadastrado com sucesso!!!") })
    }
  }
  async mostrarAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }



  validarSenhas() {
    if (this.cliente.usuario.senha.length < 6) {
      this.mostrarAlerta('A senha deve ter pelo menos 6 caracteres.');
       // Focar no campo de senha para correção
       setTimeout(() => {
        this.senhaInput.setFocus();
      }, 500); // Um pequeno atraso para garantir que o alerta seja fechado primeiro

      return false;
    }

    if (this.cliente.usuario.senha !== this.senhaRepetida) {
      this.mostrarAlerta('As senhas não coincidem.');
       // Focar no campo de senha para correção
       setTimeout(() => {
        this.senhaInput.setFocus();
      }, 500); // Um pequeno atraso para garantir que o alerta seja fechado primeiro

      return false;
    }

    return true;

  }

}
