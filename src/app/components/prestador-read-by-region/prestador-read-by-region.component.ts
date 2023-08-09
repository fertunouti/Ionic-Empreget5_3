import { Component, OnInit,Input,OnChanges,Output,EventEmitter } from '@angular/core';
import { prestadorFilter } from 'src/app/services/prestadorFilter.model';

@Component({
  selector: 'app-prestador-read-by-region',
  templateUrl: './prestador-read-by-region.component.html',
  styleUrls: ['./prestador-read-by-region.component.scss'],
})
export class PrestadorReadByRegionComponent  implements OnInit, OnChanges {

  @Input() prestadoresByRegion!: prestadorFilter[]
  
  
  
  constructor() { }

  ngOnInit() {
   
    
  }
  ngOnChanges(){ }
   

}
