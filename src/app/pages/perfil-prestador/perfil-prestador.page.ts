import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { osPedido } from 'src/app/services/osPedido.model';

@Component({
  selector: 'app-perfil-prestador',
  templateUrl: './perfil-prestador.page.html',
  styleUrls: ['./perfil-prestador.page.scss'],
})
export class PerfilPrestadorPage implements OnInit {
 
  


  constructor(private apiService:ApiService) { }
  perfilPrestador: any
  ngOnInit() {
    this.apiService.getPerfisPrestadoresById().subscribe(
      (data) => {
         this.perfilPrestador = data;
        console.log('Perfil dos prestadores:', this.perfilPrestador);
       },
      (error) => {
         console.error('Erro ao obter perfil dos prestadores:', error);
       }
      );
  }

 
}
