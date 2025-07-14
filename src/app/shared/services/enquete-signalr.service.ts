import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnqueteSignalRService {

  private hubConnection!: signalR.HubConnection;
  private resultadoSubject = new BehaviorSubject<any>(null);
  resultado$ = this.resultadoSubject.asObservable();

  constructor() {}

  startConnection(enqueteId: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.urlHub}/hubs/enquete`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start()
      .then(() => {
        this.entrarNaEnquete(enqueteId);
        this.listenForUpdates();
      })
      .catch(err => console.error('Erro ao iniciar conexão SignalR:', err));
  }

  async stopConnection(enqueteId: string): Promise<void> {
  if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
    try {
      await this.hubConnection.invoke('SairDaEnquete', enqueteId);
    } catch (err) {
      console.error('Erro ao sair da enquete:', err);
    }

    try {
      await this.hubConnection.stop();
    } catch (err) {
      console.error('Erro ao parar conexão SignalR:', err);
    }
  }
}

  private entrarNaEnquete(enqueteId: string): void {
    this.hubConnection.invoke('EntrarNaEnquete', enqueteId)
      .catch(err => console.error('Erro ao entrar na enquete:', err));
  }

  private sairDaEnquete(enqueteId: string): void {
    this.hubConnection.invoke('SairDaEnquete', enqueteId)
      .catch(err => console.error('Erro ao sair da enquete:', err));
  }

  private listenForUpdates(): void {
    this.hubConnection.on('VotoAtualizado', (resultadoAtualizado: any) => {
      this.resultadoSubject.next(resultadoAtualizado);
    });
  }
}