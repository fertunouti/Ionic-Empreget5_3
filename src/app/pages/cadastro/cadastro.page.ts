import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/services/cliente.model';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {

  constructor(private apiService:ApiService) {
  }

  prefixo: string = ''

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
  
  this.cliente.usuario.role = this.apiService.getUserRole()
  this.cliente.endereco.logradouro= this.prefixo +" "+ this.cliente.endereco.logradouro

  
  this.apiService.postCadastrarCliente(this.cliente).subscribe(
     (response: any) => { console.log("CLIENTE cadastrado com sucesso!!!")})
 
}

}
