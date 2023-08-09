import { Component, OnInit,OnChanges,Input } from '@angular/core';
import { prestadorFilter } from '../../services/prestadorFilter.model';

@Component({
  selector: 'app-prestador-read-by-name',
  templateUrl: './prestador-read-by-name.component.html',
  styleUrls: ['./prestador-read-by-name.component.scss'],
})
export class PrestadorReadByNameComponent  implements OnInit, OnChanges  {

  
    
  @Input() prestadoresByName!: prestadorFilter[]
  constructor() { }
   
  ngOnInit() {    }

  ngOnChanges() { console.log('acionado')   }

}