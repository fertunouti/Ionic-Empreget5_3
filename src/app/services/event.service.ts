
// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private pedidoCadastrado = new Subject<void>();
  private osCancelada = new Subject<void>();

  pedidoCadastrado$ = this.pedidoCadastrado.asObservable();
  osCancelada$ = this.osCancelada.asObservable();

  emitPedidoCadastrado() {
    this.pedidoCadastrado.next();
  }
  emitOSCancelada() {
    this.osCancelada.next();
  }
}

