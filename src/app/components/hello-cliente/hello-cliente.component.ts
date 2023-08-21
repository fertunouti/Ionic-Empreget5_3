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

  prestadoresByName!: any
  prestadoresByRegion!: any
  mostraTodos!: boolean
  mostraName!: boolean
  mostraRegion!: boolean


  onMudouTermo(evento: any) {
    console.log(evento.novoTermo)
    this.apiService.addTermo(evento.novoTermo)
    this.apiService.readByName().subscribe(prestadores => {
      this.prestadoresByName = prestadores;
      this.mostraTodos = false
      this.mostraName = true
      this.mostraRegion = false

    })
  }

  onMudouRegion(evento: any) {
    console.log(evento.novaRegiao)
    this.apiService.addRegion(evento.novaRegiao)
    this.apiService.readByRegion().subscribe(prestadores => {
      this.prestadoresByRegion = prestadores;
      this.mostraTodos = false
      this.mostraRegion = true
      this.mostraName = false
    })
  }
  onMostraTodos() {
    this.mostraTodos = true
    this.mostraRegion = false
    this.mostraName = false
  }

}
