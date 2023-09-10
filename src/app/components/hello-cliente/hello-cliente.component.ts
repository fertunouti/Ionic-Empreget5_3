import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { prestadorFilter } from 'src/app/services/prestadorFilter.model';




@Component({
  selector: 'app-hello-cliente',
  templateUrl: './hello-cliente.component.html',
  styleUrls: ['./hello-cliente.component.scss'],
})

export class HelloClienteComponent  implements OnInit {
  constructor(private apiService: ApiService) { }

  emailUserAtual: string = '';
  nomePrestadorProcurado!: any
  clientes: any
  tipoUser!: string
 
 
  ngOnInit(): void {
    this.tipoUser = this.apiService.getUserRole()
    this.readCliente()
  }

  readCliente(){
    this.apiService.getDataPerfisClientes().subscribe(
      (data) => {
      this.clientes = data;
       },
    (error) => {
       console.error('Erro ao obter dados dos prestadores:', error);
     })    
   }

   onClickAtualizarCliente() {
    this.apiService.addClienteId(this.clientes[0].id)
  }

}
