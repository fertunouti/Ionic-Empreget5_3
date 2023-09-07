import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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

 isLoggedIn!: boolean;
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
  constructor(
    private apiService:ApiService,
    private alertController: AlertController,
    private navCtrl: NavController) {  
  }
  
  ngOnInit() {
    this.isLoggedIn = this.apiService.readLoginStatus()

  }
  onClickCancelar(){
   // this.apiService.setUserRole('');
   console.log(this.isLoggedIn)
    this.navCtrl.navigateBack('/loading');
  }
onClick() {
  if (!this.validarSenhas()) {
    return; // Retorna se as senhas não forem válidas
  }
  
  if (!this.validarFormatoValor()) {
    return; // Retorna se o formato do valor não for válido
  }
  
  this.prestador.usuario.role = this.apiService.getUserRole()
  this.prestador.endereco.logradouro= this.prefixo +' '+ this.prestador.endereco.logradouro
  this.apiService.postCadastrarPrestador(this.prestador).subscribe(
     (response: any) => { 
      console.log("CLIENTE cadastrado com sucesso!!!");
      this.mostrarAlerta('Cadastro concluído com sucesso.');
      this.navCtrl.navigateBack('/hello');
      this.resetValoresIniciais();
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

validarFormatoValor(): boolean {
  const formatoValido = /^\d+\.\d{2}$/.test(this.prestador.servico.valor);
  if (!formatoValido) {
    this.mostrarAlerta('O valor do serviço deve estar no formato #.##');
  }
  return formatoValido;
}

resetValoresIniciais(){
  this.prestador = {nome: '',
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
observacao: ''};
this.senhaRepetida = '';
}

// Função chamada quando o formulário for submetido
onSubmit() {
  
    // Lógica para processar o formulário
  }
}



