import { Component, inject, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { Enquete } from '../../../core/models/enquete.interface';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VotoService } from '../../../shared/services/voto.service';
import { EnqueteSignalRService } from '../../../shared/services/enquete-signalr.service';

@Component({
  selector: 'app-visualizar-enquete',
  imports: [NzCardModule, NzSpinModule, NzProgressModule, NzRadioModule, FormsModule, NzButtonModule],
  templateUrl: './visualizar-enquete.html',
  styleUrl: './visualizar-enquete.css'
})
export class VisualizarEnquete implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private signalRIniciado = false;
  viewResultado = false;

  enquete!: Enquete;
  opcaoSelecionadaId: string | null = null;

  enqueteService = inject(EnqueteService);
  votoService = inject(VotoService);
  enqueteSignalR = inject(EnqueteSignalRService);

  constructor(@Inject(NZ_MODAL_DATA) @Optional() public data?: { enqueteId: string }) { }

  ngOnInit(): void {
    if (this.data?.enqueteId) {
      this.getEnquete();
    }
  }

  iniciaSignalR() {
    if (this.signalRIniciado || !this.enquete?.id) return;

    this.signalRIniciado = true;

    this.enqueteSignalR.startConnection(this.enquete.id);
    this.enqueteSignalR.resultado$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getEnquete();
      });
  }

  votar() {
    this.votoService.addVoto({
      enqueteId: this.enquete.id,
      opcaoEnqueteId: this.opcaoSelecionadaId!
    }).subscribe({
      next: () => {
        this.getEnquete();
        this.viewResultado = true;
      }
    });
  }

  votarNovamente(){
    this.viewResultado = false;
  }

  getEnquete() {
    this.enqueteService.getEnquete(this.data!.enqueteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.enquete = res;
          this.iniciaSignalR();
        }
      });
  }

  verResultado(){
    this.viewResultado = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    void this.enqueteSignalR.stopConnection(this.enquete.id);
  }
}
