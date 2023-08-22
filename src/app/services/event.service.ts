
// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private osCadastrada = new Subject<void>();
  private osCancelada = new Subject<void>();
  private osAceite = new Subject<void>();
  private osRecusada = new Subject<void>();

  osCadastrado$ = this.osCadastrada.asObservable();
  osCancelada$ = this.osCancelada.asObservable();
  osAceite$=this.osAceite.asObservable();
  osRecusada$=this.osRecusada.asObservable();

  emitPedidoCadastrado() {
    this.osCadastrada.next();
  }
  emitOSCancelada() {
    this.osCancelada.next();
  }
  emitOSAceite() {
    this.osAceite.next();
  }
  emitOSRecusada() {
    this.osRecusada.next();
  }
}

