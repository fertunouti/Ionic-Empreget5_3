import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { prestadorFilter } from 'src/app/services/prestadorFilter.model';

@Component({
  selector: 'app-pesquisa-prestador',
  templateUrl: './pesquisa-prestador.page.html',
  styleUrls: ['./pesquisa-prestador.page.scss'],
})
export class PesquisaPrestadorPage implements OnInit {

  constructor(private prestadorByName: ApiService, private prestadorByRegion:ApiService) { }

 

  emailUserAtual: string = '';
  nomePrestadorProcurado!: any

  prestadoresByName!: prestadorFilter[]
  prestadoresByRegion!: prestadorFilter[]
  mostraTodos!: boolean
  mostraName!: boolean
  mostraRegion!: boolean

  ngOnInit() {

    this.mostraTodos = true
    this.mostraName = false
    this.mostraRegion = false
  }
  

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

 

}
