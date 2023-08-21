import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { Prestadores } from 'src/app/services/prestador.model';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.page.html',
  styleUrls: ['./cadastro-prestador.page.scss'],
})
export class CadastroPrestadorPage implements OnInit {

  constructor(private apiService:ApiService) {
  }

 prefixo: string = ''

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
      valor: null
  },

  disponibilidade: '',
  observacao: ''
  }

  ngOnInit() {


  }
onClick() {
  
  this.prestador.usuario.role = this.apiService.getUserRole()
  this.prestador.endereco.logradouro= this.prefixo +" "+ this.prestador.endereco.logradouro

  
  this.apiService.postCadastrarPrestador(this.prestador).subscribe(
     (response: any) => { console.log("CLIENTE cadastrado com sucesso!!!")})
 
}

}
