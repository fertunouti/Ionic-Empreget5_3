import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-hello-prestador',
  templateUrl: './hello-prestador.component.html',
  styleUrls: ['./hello-prestador.component.scss'],
})
export class HelloPrestadorComponent  implements OnInit {

  constructor(private apiService:ApiService) { }
  prestadores: any

  ngOnInit() { 
    this.readPrestador()
    
  }
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
