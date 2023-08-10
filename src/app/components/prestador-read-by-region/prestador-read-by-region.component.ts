import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { prestadorFilter } from 'src/app/services/prestadorFilter.model';

@Component({
  selector: 'app-prestador-read-by-region',
  templateUrl: './prestador-read-by-region.component.html',
  styleUrls: ['./prestador-read-by-region.component.scss'],
})
export class PrestadorReadByRegionComponent  implements OnInit {

  @Input() prestadoresByRegion!: prestadorFilter[]
  
  
  
  constructor(private apiService:ApiService) { }

  ngOnInit() {  
    
  }
  
  onClick(prestadorId:any){
    this.apiService.addId(prestadorId)
   }
   

}
