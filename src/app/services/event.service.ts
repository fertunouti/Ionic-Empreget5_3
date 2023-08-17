
// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private pedidoCadastrado = new Subject<void>();
  private pedidoCancelado = new Subject<void>();

  pedidoCadastrado$ = this.pedidoCadastrado.asObservable();
  pedidoCancelado$ = this.pedidoCancelado.asObservable();

  emitPedidoCadastrado() {
    this.pedidoCadastrado.next();
  }
  emitPedidoCancelado() {
    this.pedidoCancelado.next();
  }
}

