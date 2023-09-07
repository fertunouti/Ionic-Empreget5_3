import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';

@Component({
  selector: 'app-gerenciar-foto',
  templateUrl: './gerenciar-foto.page.html',
  styleUrls: ['./gerenciar-foto.page.scss'],
})
export class GerenciarFotoPage implements OnInit {

  constructor(private apiService: ApiService) { }
  tipoUser!: string

  ngOnInit() {
    this.tipoUser = this.apiService.getUserRole()
  }

}
