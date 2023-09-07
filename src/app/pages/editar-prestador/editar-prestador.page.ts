import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-editar-prestador',
  templateUrl: './editar-prestador.page.html',
  styleUrls: ['./editar-prestador.page.scss'],
})
export class EditarPrestadorPage implements OnInit {

  constructor(private apiService:ApiService, private eventService:EventService, private http: HttpClient) { }

  ngOnInit() {
  }
  onUpload(){
    
  }

}
