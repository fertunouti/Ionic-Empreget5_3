import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/apiService';
import { Prestadores } from 'src/app/services/prestador.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.page.html',
  styleUrls: ['./cadastro-prestador.page.scss'],
})
export class CadastroPrestadorPage implements OnInit {
   
 prefixo: string = ''
 senhaRepetida: string = '';
 prestador: Prestadores = {
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
    regiao: '',
    rg: '',
    cpf: '',
    telefone: '',
    usuario: {
      email: '',
      senha: '',
      role: ''
    },
    servico: {
      descricao: '',
      valor: ''
  },

  disponibilidade: '',
  observacao: ''
  }
  constructor(private apiService:ApiService,private alertController: AlertController) {
    
  }
  
  ngOnInit() {


  }
onClick() {
  if (this.validarSenhas()) {
  
  this.prestador.usuario.role = this.apiService.getUserRole()
  this.prestador.endereco.logradouro= this.prefixo +" "+ this.prestador.endereco.logradouro

  
  this.apiService.postCadastrarPrestador(this.prestador).subscribe(
     (response: any) => { console.log("CLIENTE cadastrado com sucesso!!!")})
 
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
  if (this.prestador.usuario.senha.length < 6) {
    this.mostrarAlerta('A senha deve ter pelo menos 6 caracteres.');
    return false;
  }

  if (this.prestador.usuario.senha !== this.senhaRepetida) {
    this.mostrarAlerta('As senhas não coincidem.');
    return false;
  }

  return true;
}

// Função chamada quando o formulário for submetido
onSubmit() {
  
    // Lógica para processar o formulário
  }
}



