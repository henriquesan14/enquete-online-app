import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Enquete } from '../../../core/models/enquete.interface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DatePipe } from '@angular/common';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { VisualizarEnquete } from '../visualizar-enquete/visualizar-enquete';
import { IsOwnerDirective } from '../../../shared/directives/is-owner';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'card-enquete',
  imports: [NzCardModule, NzProgressModule, NzButtonModule, DatePipe, NzModalModule, IsOwnerDirective, NzIconModule, NzToolTipModule],
  templateUrl: './card-enquete.html',
  styleUrl: './card-enquete.css'
})
export class CardEnquete {
  @Input({required: true}) enquete!: Enquete;
  confirmModal?: NzModalRef;
  private modal = inject(NzModalService);
  enqueteService = inject(EnqueteService);
  toastr = inject(ToastrService);
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  visualizar(){
      const modal = this.modal.create({
            nzTitle: `${this.enquete.titulo}`,
            nzContent: VisualizarEnquete,
            nzWidth: '800px',
            nzData:{
              enqueteId: this.enquete.id
            },
            nzFooter: null
          });

      modal.afterClose.subscribe(() => {
          this.closeModal.emit();
      });
  }

  excluir(): void {
      this.confirmModal = this.modal.confirm({
        nzTitle: 'Exclusão',
        nzContent: 'Tem certeza que quer remover esta enquete?',
        nzOnOk: () =>
          this.enqueteService.deleteEnquete(this.enquete.id).subscribe({
            next: () => {
              this.toastr.success('Enquete removida!', 'Sucesso');
              this.closeModal.emit();
            }
          })
      });
    }
}
