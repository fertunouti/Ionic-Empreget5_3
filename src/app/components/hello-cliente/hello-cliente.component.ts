
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { prestadorFilter } from '../../services/prestadorFilter.model';



@Component({
  selector: 'app-hello-cliente',
  templateUrl: './hello-cliente.component.html',
  styleUrls: ['./hello-cliente.component.scss'],
})
export class HelloClienteComponent implements OnInit {

  constructor(private prestadorByName: ApiService, private prestadorByRegion: ApiService) { }

  emailUserAtual: string = '';
  nomePrestadorProcurado!: any

  prestadoresByName!: prestadorFilter[]
  prestadoresByRegion!: prestadorFilter[]
  mostraTodos!: boolean
  mostraName!: boolean
  mostraRegion!: boolean


  onMudouTermo(evento: any) {
    console.log(evento.novoTermo)
    this.prestadorByName.addTermo(evento.novoTermo)
    this.prestadorByName.readByName().subscribe(prestadores => {
      this.prestadoresByName = prestadores;
      this.mostraTodos = false
      this.mostraName = true
      this.mostraRegion = false

    })
  }

  onMudouRegion(evento: any) {
    console.log(evento.novaRegiao)
    this.prestadorByRegion.addRegion(evento.novaRegiao)
    this.prestadorByRegion.readByRegion().subscribe(prestadores => {
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

  ngOnInit() {

    this.mostraTodos = true
    this.mostraName = false
    this.mostraRegion = false
  }
}