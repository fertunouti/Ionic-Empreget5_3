import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/apiService';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-atualizar-foto',
  templateUrl: './atualizar-foto.component.html',
  styleUrls: ['./atualizar-foto.component.scss'],
})
export class AtualizarFotoComponent  implements OnInit {

  files! : Set<File>;
  foto: any;
  prestadores: any;
  selectedFiles : any
  private fotoAtualizadaSubscription: Subscription;
  constructor(
    private apiService:ApiService,
    private eventService:EventService,
    private http: HttpClient,
    private alertController: AlertController
    ) {
      this.fotoAtualizadaSubscription = this.eventService.fotoAtualizada$.subscribe(() => {
        this.readPrestador();
        
      });
     }

  ngOnInit() {
    console.log(this.apiService.readId())
    this.readPrestador();
  }
  ngOnDestroy() {
    // Cancelar a inscrição no observável para evitar vazamentos de memória
    this.fotoAtualizadaSubscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    //this.readPrestador();
   }
  onChange(event:any){
   console.log (event)
   this.selectedFiles = event.srcElement.files;
   console.log(this.selectedFiles)
   
  }
  
  onUpload(){
    const formData = new FormData();
      console.log(this.selectedFiles[0])
      formData.append('arquivo',this.selectedFiles[0], this.selectedFiles[0].name);
      this.apiService.putFotos(formData).subscribe(
        (response: any) => {
          this.eventService.emitFotoAtualizada();
           this.mostrarAlerta('Foto do perfil atualizado!!!');
           
       },
        (error) => {
          console.error("Erro ao cadastrar: ", error);
          this.mostrarAlerta('Erro ao cadastrar. Verifique os dados e tente novamente.');
          // Você pode adicionar mais tratamento de erro conforme necessário, como reverter as alterações, etc.
        }
     );
  }
  async mostrarAlerta(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Parabéns!',
      message: mensagem,
      buttons: ['OK']
    });
  
    await alert.present();
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
        console.error('Erro ao obter dados da foto', error);
      }
    );
  }

}
