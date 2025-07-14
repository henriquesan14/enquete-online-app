import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewEnquete } from '../../../core/models/new-enquete.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EnqueteService } from '../../../shared/services/enquete.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-form-enquete',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './form-enquete.html',
  styleUrl: './form-enquete.css'
})
export class FormEnquete {
  form: FormGroup;
  enqueteService = inject(EnqueteService);
  toastr = inject(ToastrService);

  constructor(private modalRef: NzModalRef, private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      encerramento: ['', Validators.required],
      opcoes: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ])
    });
  }

  // Acesso ao FormArray
  get opcoesFormArray(): FormArray {
    return this.form.get('opcoes') as FormArray;
  }

  // Para iterar no template com tipo certo
  get opcoes(): FormControl[] {
    return this.opcoesFormArray.controls as FormControl[];
  }

  adicionarOpcao(): void {
    this.opcoesFormArray.push(this.fb.control('', Validators.required));
  }

  removerOpcao(index: number): void {
    if (this.opcoesFormArray.length > 2) {
      this.opcoesFormArray.removeAt(index);
    }
  }

  salvar(): void {
    if (this.form.valid) {
      const novaEnquete: NewEnquete = this.form.value;
      
      this.enqueteService.addEnquete(novaEnquete).subscribe({
        next: () => {
          this.toastr.success('Enquete adicionada');
          this.modalRef.close(true);
        }
      })
    }
  }
}
