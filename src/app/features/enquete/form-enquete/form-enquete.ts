import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewEnquete } from '../../../core/models/new-enquete.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { ToastrService } from 'ngx-toastr';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { passDateValidator } from '../../../shared/validators/pass-date.validator';
import { todasOpcoesPreenchidasValidator } from '../../../shared/validators/opcoes-preenchidas.validator';


@Component({
  selector: 'app-form-enquete',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './form-enquete.html',
  styleUrl: './form-enquete.css'
})
export class FormEnquete implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  enqueteService = inject(EnqueteService);
  toastr = inject(ToastrService);


  constructor(private modalRef: NzModalRef, private fb: FormBuilder, @Inject(NZ_MODAL_DATA) public data: { enqueteId: string }) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      encerramento: ['', [Validators.required, passDateValidator()]],
      opcoes: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ],
      [todasOpcoesPreenchidasValidator])
    });
    if (this.data?.enqueteId) {
      this.getEnquete();
    }
  }

  getEnquete() {
    this.enqueteService.getEnquete(this.data!.enqueteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.form.patchValue({
            titulo: res.titulo,
            descricao: res.descricao,
            encerramento: res.encerramento
          });

          this.opcoesFormArray.clear();
          res.opcoes.forEach(opcao => {
            this.opcoesFormArray.push(this.fb.control(opcao.descricao, Validators.required));
          });
        }
      });
  }

  submit(): void {
    if (this.form.valid) {
      const enquete: NewEnquete = this.form.value;

      if(this.data && this.data.enqueteId){
        this.atualizarEnquete(enquete);
      }else{
        this.cadastrarEnquete(enquete);
      }
    }
  }

  atualizarEnquete(enquete: NewEnquete){
    enquete.id = this.data.enqueteId;
    this.enqueteService.updateEnquete(enquete).subscribe({
        next: () => {
          this.toastr.success('Enquete atualizada');
          this.modalRef.close(true);
        }
    });
  }

  cadastrarEnquete(enquete: NewEnquete){
    this.enqueteService.addEnquete(enquete).subscribe({
        next: () => {
          this.toastr.success('Enquete adicionada');
          this.modalRef.close(true);
        }
    });
  }

  get opcoesFormArray(): FormArray {
    return this.form.get('opcoes') as FormArray;
  }

  get opcoes(): FormControl[] {
    return this.opcoesFormArray.controls as FormControl[];
  }

    get opcoesControl() {
    return this.form.get('opcoes');
  }

  adicionarOpcao(): void {
    this.opcoesFormArray.push(this.fb.control('', Validators.required));
  }

  removerOpcao(index: number): void {
    if (this.opcoesFormArray.length > 2) {
      this.opcoesFormArray.removeAt(index);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
