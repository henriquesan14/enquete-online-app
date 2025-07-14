import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ErrorHandlerService } from "../services/error-handler.service";

export const ErrorHandlerInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const errorHandlerService = inject(ErrorHandlerService);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          errorHandlerService.handleErrors(error);
          return throwError(() => error);
        })
      );
    
}