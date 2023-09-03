
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/apiService';
import { Avaliacao } from 'src/app/services/avaliacao.model';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {

  constructor(private apiService:ApiService , private router:Router) { }
  tipoUser : any
  idPedido! : number
  pedido: any
  pedidos: any
  avaliacoes: any
  valorAvaliacao!: number | null
  avaliacao: Avaliacao = {
      estrelas : null,
      comentario: ''
  }




  ngOnInit() {
    this.valorAvaliacao = 0
    this.tipoUser = this.apiService.getUserRole()
    this.idPedido = this.apiService.readId()
    console.log ("idPedido=" + this.idPedido)
    this.getPedidosByIdAndRefresh()
    this.getAvaliacoesByIdOSAndRefresh()
  }

 

  mudouAvaliacao(event: number) {
    this.valorAvaliacao = event
  }

  onClickInicio(){
    this.apiService.addCurrentPage(0)
    this.router.navigateByUrl('/hello');

  }

  onClickAvaliacao(){
    this.avaliacao.estrelas=this.valorAvaliacao
    console.log ("avaliação para OS "+this.idPedido+" =" + this.avaliacao.comentario + this.avaliacao.estrelas)

     this.apiService.postAvaliacao(this.avaliacao).subscribe(
       (response: any) => { console.log("AVALIACAO cadastrado com sucesso!!!")})
  }

  private getPedidosByIdAndRefresh() {
    this.apiService.getByIdPedido().subscribe(
      (data) => {
        this.pedido = data;
        console.log('////getPedidosByIdAndRefresh:', this.pedido);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }

private getPedidosPageAndRefresh() {
    this.apiService.getPedidosPage().subscribe(
      (data) => {
        this.pedidos = data;
        console.log('///getPedidosPageAndRefresh:', this.pedidos);
      },
      (error) => {
        console.error('Erro ao obter dados dos pedidos:', error);
      }
    );
  }
private getAvaliacoesByIdOSAndRefresh() {
    this.apiService.getAvaliacoesByIdOS().subscribe(
      (data) => {
        this.avaliacoes = data;
        console.log('///getAvaliacoesAndRefresh:', this.avaliacoes.conteudo[0].estrelas);
      },
      (error) => {
        console.error('Erro ao obter dados dos avaliacoes:', error);
      }
    );
  }
}


