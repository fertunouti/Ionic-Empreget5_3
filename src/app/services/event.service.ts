
// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private pedidoCadastrado = new Subject<void>();

  pedidoCadastrado$ = this.pedidoCadastrado.asObservable();

  emitPedidoCadastrado() {
    this.pedidoCadastrado.next();
  }
}

