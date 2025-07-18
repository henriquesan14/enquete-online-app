import { Component, computed, inject, signal } from '@angular/core';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { CardEnquete } from '../card-enquete/card-enquete';
import { switchMap } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FormEnquete } from '../form-enquete/form-enquete';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-listagem-enquetes',
  imports: [CardEnquete, NzButtonModule, NzModalModule, NzPaginationModule, FormsModule, NzFormModule, NzInputModule],
  templateUrl: './listagem-enquetes.html',
  styleUrl: './listagem-enquetes.css'
})
export class ListagemEnquetes {
  private enqueteService = inject(EnqueteService);
  private modalService = inject(NzModalService);

  // Signals de filtro e paginação
  filtroTitulo = signal('');
  pageNumber = signal(1);
  pageSize = signal(10);

  // Signal de parâmetros para consulta
  private params = computed(() => ({
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    titulo: this.filtroTitulo()
  }));

  // Signal da API (com toSignal)
  paginatedEnquete = toSignal(
    toObservable(this.params).pipe(
      switchMap(p => this.enqueteService.getEnquetes(p))
    ),
    { initialValue: { data: [], pageNumber: 1, pageSize: 10, count: 0 } }
  );

  novaEnquete() {
    const modal = this.modalService.create({
      nzTitle: `Nova enquete`,
      nzContent: FormEnquete,
      nzWidth: '800px',
      nzFooter: null
    });

    modal.afterClose.subscribe(result => {
      if (result) {
        // Dispara nova chamada apenas trocando a página (força recomputação)
        this.pageNumber.update(v => v); // trigger re-fetch
      }
    });
  }

  onBuscar() {
    // Atualiza página para 1 e força revalidação dos params
    this.pageNumber.set(1);
    this.pageNumber.update(v => v); // dispara nova busca
  }

  onPageChange(page: number) {
    this.pageNumber.set(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
  }

  atualizarFiltroTitulo(titulo: string) {
    this.filtroTitulo.set(titulo);
    this.pageNumber.set(1); // Reinicia na primeira página ao filtrar
  }

}
