import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LocalstorageService } from "../../shared/services/local-storage.service";

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  toastr = inject(ToastrService);
  localStorageService = inject(LocalstorageService);

  handleErrors(res: HttpErrorResponse): void {
    const auth = this.localStorageService.getUserStorage();
    if (res.status == 403) {
      this.toastr.error('Você não tem permissão para isso.');
      return;
    }
    if (res.status == 401 && auth) {
      this.localStorageService.removeUsertorage();
      return;
    }
    if (res.error.errors) {
      for (const [key, value] of Object.entries(res.error.errors)) {
        this.toastr.error(`${key}: ${value}`, 'Erro!');
      }
    }
    else if (res.error.detail) {
      this.toastr.error(`${res.error.detail}`, 'Erro!');
    }
    else if (res.error.message) {
      this.toastr.error(`${res.error.message}`, 'Erro!');
    }
    else {
      this.toastr.error('Ocorreu um erro.', 'Erro!');
    }
  }
}