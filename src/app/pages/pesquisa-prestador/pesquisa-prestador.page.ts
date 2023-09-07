import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { prestadorFilter } from 'src/app/services/prestadorFilter.model';

@Component({
  selector: 'app-pesquisa-prestador',
  templateUrl: './pesquisa-prestador.page.html',
  styleUrls: ['./pesquisa-prestador.page.scss'],
})
export class PesquisaPrestadorPage implements OnInit {

  constructor(private apiService: ApiService) { }

 

  emailUserAtual: string = '';
  nomePrestadorProcurado!: any

  prestadoresByName!: any
  prestadoresByRegion!: any
  mostraTodos!: boolean
  mostraName!: boolean
  mostraRegion!: boolean
  foto:any

  ngOnInit() {

    this.mostraTodos = true
    this.mostraName = false
    this.mostraRegion = false
  }
  

  onMudouTermo(evento: any) {
    console.log(evento.novoTermo)
    this.apiService.addTermo(evento.novoTermo)
    this.apiService.readByName().subscribe(prestadores => {
      this.prestadoresByName = prestadores;
       // Iterar sobre os prestadores e obter a URL da imagem para cada um
    for (const prestador of this.prestadoresByName.conteudo) {
      this.getImagemUrl(prestador.id);
    }
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
       // Iterar sobre os prestadores e obter a URL da imagem para cada um
    for (const prestador of this.prestadoresByRegion.conteudo) {
      this.getImagemUrl(prestador.id);
    }
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

  getImagemUrl(id: number) {
    this.apiService.getFotoByIdListaPrestadores(id).subscribe(
      (data) => {
        this.foto = data;
        const imgUrl = `assets/images/${this.foto.nomeArquivo}`;
        // Encontre o prestador com o ID correspondente e atribua a URL da imagem
        const prestador = this.prestadoresByName.conteudo.find((p: any) => p.id === id);
        if (prestador) {
          prestador.imgUrl = imgUrl;
        }
      },
      (error) => {
        console.error('Erro ao obter dados dos avaliacoes:', error);
      }
    );
  }

}
