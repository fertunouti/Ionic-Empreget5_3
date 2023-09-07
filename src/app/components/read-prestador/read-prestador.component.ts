// import { Component, OnInit } from '@angular/core';
// import { ApiService } from 'src/app/services/apiService';
// import { Observable } from 'rxjs';
// import { TokenService } from 'src/app/services/token.service';


// @Component({
//   selector: 'app-read-prestador',
//   templateUrl: './read-prestador.component.html',
//   styleUrls: ['./read-prestador.component.scss'],
// })
// export class ReadPrestadorComponent  implements OnInit {

//   constructor(private apiService: ApiService, private tokenService:TokenService) { }
//   prestadores!: any
//   foto: any
//   nomeFotoPerfil!: string
  
//   ngOnInit() {
//     this.readPrestador()
//   }

//   //Obtém perfil dos prestadores em apiService
//   readPrestador(): void {
//      this.apiService.getDataPerfisPrestadores().subscribe(
//      (data) => {
//         this.prestadores = data;
//        console.log('Dados de todos os prestadores:', this.prestadores);
       
//      (error) => {
//         console.error('Erro ao obter dados dos prestadores:', error);
//       }
//      );
//    }
//    onClick(prestadorId:number){
//     this.apiService.addPrestadorId(prestadorId)
//    }

   
//   getImagemUrl(id:number) {
   
//      this.apiService.getFotoByIdListaPrestadores(id).subscribe(
//        (data) => {
//          this.foto = data;
//          return `assets/images/${this.foto.nomeArquivo}`;
//        },
//        (error) => {
//          console.error('Erro ao obter dados dos avaliacoes:', error);
//       }
//      );
 
//    }

// }
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-read-prestador',
  templateUrl: './read-prestador.component.html',
  styleUrls: ['./read-prestador.component.scss'],
})
export class ReadPrestadorComponent  implements OnInit {
  constructor(private apiService: ApiService, private tokenService: TokenService) { }
  prestadores: any = { conteudo: [] }; // Inicialize prestadores como um objeto vazio com conteudo como um array
  foto: any;
  nomeFotoPerfil!: string;

  ngOnInit() {
    this.readPrestador();
  }

  // Obtém perfil dos prestadores em apiService
  readPrestador(): void {
    this.apiService.getDataPerfisPrestadores().subscribe(
      (data) => {
        this.prestadores = data;
       

        // Iterar sobre os prestadores e obter a URL da imagem para cada um
        for (const prestador of this.prestadores.conteudo) {
          this.getImagemUrl(prestador.id);
        }
        console.log('Dados de todos os prestadores:', this.prestadores);
      },
      (error) => {
        console.error('Erro ao obter dados dos prestadores:', error);
      }
    );
  }

  onClick(prestadorId: number) {
    this.apiService.addPrestadorId(prestadorId);
  }

  getImagemUrl(id: number) {
    this.apiService.getFotoByIdListaPrestadores(id).subscribe(
      (data) => {
        this.foto = data;
        const imgUrl = `assets/images/${this.foto.nomeArquivo}`;
        // Encontre o prestador com o ID correspondente e atribua a URL da imagem
        const prestador = this.prestadores.conteudo.find((p: any) => p.id === id);
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
