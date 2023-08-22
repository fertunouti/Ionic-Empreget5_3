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
 
 
  ngOnInit(): void {
  
    this.readCliente()
  }

  readCliente(){
    this.apiService.getDataPerfisClientes().subscribe(
      (data) => {
      this.clientes = data;
      console.log("Clientes onInit=" + this.clientes) 
    },
    (error) => {
       console.error('Erro ao obter dados dos prestadores:', error);
     })    
   }
}
