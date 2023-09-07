import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-atualizar-foto',
  templateUrl: './atualizar-foto.component.html',
  styleUrls: ['./atualizar-foto.component.scss'],
})
export class AtualizarFotoComponent  implements OnInit {

  files! : Set<File>;
  selectedFiles : any
  constructor(private apiService:ApiService, private eventService:EventService, private http: HttpClient) { }

  ngOnInit() {
    console.log(this.apiService.readId())
  }
 

  onChange(event:any){
   console.log (event)
   this.selectedFiles = event.srcElement.files;
   console.log(this.selectedFiles)
   //this.files.add(this.selectedFiles)
   //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name
    // if(event.target.files&&event.target.files[0]){
    //   const foto = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append('foto', foto);
    //   this.postarFotoAndRefresh(formData)
    // }
  }
  // postarFotoAndRefresh(data:any){
  //   this.apiService.postFotos(data)
  // }
  onUpload(){
   
    //if(this.files && this.files.size>0){
      const formData = new FormData();
      console.log(this.selectedFiles[0])
      formData.append('arquivo',this.selectedFiles[0], this.selectedFiles[0].name);
      this.apiService.putFotos(formData).subscribe(
        (response: any) => { console.log("FOTOS cadastrado com sucesso!!!") })
    //}

  }

}
