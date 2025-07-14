import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Enquete } from '../../../core/models/enquete.interface';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { CardEnquete } from '../card-enquete/card-enquete';
import { Subject, takeUntil } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormEnquete } from '../form-enquete/form-enquete';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginatedResult } from '../../../core/models/paginated-result.interface';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-listagem-enquetes',
  imports: [CardEnquete, NzButtonModule, NzModalModule, NzPaginationModule, FormsModule, NzFormModule, NzInputModule],
  templateUrl: './listagem-enquetes.html',
  styleUrl: './listagem-enquetes.css'
})
export class ListagemEnquetes implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  paginatedEnquete: PaginatedResult<Enquete> = <PaginatedResult<Enquete>>{};;
  enqueteService = inject(EnqueteService);
  modalService = inject(NzModalService);
  filtroTitulo!: string;

  ngOnInit(): void {
    this.getEnquetes(null);
  }

  getEnquetes(params: any){
    this.enqueteService.getEnquetes(params)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res) => {
        this.paginatedEnquete = res;
      }
    })
  }

  novaEnquete(){
    const modal = this.modalService.create({
      nzTitle: `Nova enquete`,
      nzContent: FormEnquete,
      nzWidth: '800px',
      nzFooter: null
    });

    modal.afterClose.subscribe((result) => {
        if (result) {
          this.getEnquetes(null);
        }
      });
  }

  onPageChange(event: number){
      const params = {
        pageNumber: event,
        pageSize: this.paginatedEnquete.pageSize,
        titulo: this.filtroTitulo
      }
      this.getEnquetes(params);
  }

  onPageSizeChange(event: number){
    const params = {
        pageNumber: this.paginatedEnquete.pageNumber,
        pageSize: event,
        titulo: this.filtroTitulo
      }
      this.getEnquetes(params);
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
