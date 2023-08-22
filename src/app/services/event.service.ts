
// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private osCadastrado = new Subject<void>();
  private osCancelada = new Subject<void>();
  private osAceite = new Subject<void>();

  osCadastrado$ = this.osCadastrado.asObservable();
  osCancelada$ = this.osCancelada.asObservable();
  osAceite$=this.osAceite.asObservable();

  emitPedidoCadastrado() {
    this.osCadastrado.next();
  }
  emitOSCancelada() {
    this.osCancelada.next();
  }
  emitOSAceite() {
    this.osAceite.next();
  }
}

