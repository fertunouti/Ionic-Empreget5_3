import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-read-prestador',
  templateUrl: './read-prestador.component.html',
  styleUrls: ['./read-prestador.component.scss'],
})
export class ReadPrestadorComponent  implements OnInit {

  constructor(private apiService: ApiService, private tokenService:TokenService) { }
  prestadores!: any
  
  ngOnInit() {this.readPrestador()}

  //Obtém perfil dos prestadores em apiService
  readPrestador(): void {
     this.apiService.getDataPerfisPrestadores().subscribe(
     (data) => {
        this.prestadores = data;
       console.log('Dados dos prestadores:', this.prestadores);
      },
     (error) => {
        console.error('Erro ao obter dados dos prestadores:', error);
      }
     );
   }

}
