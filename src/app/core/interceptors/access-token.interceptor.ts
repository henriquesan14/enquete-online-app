import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LocalstorageService } from "../../shared/services/local-storage.service";
import { environment } from "../../../environments/environment";
import { inject } from "@angular/core";
import { catchError, finalize, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

let isRefreshing = false;
export const AccessTokenInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService = inject(LocalstorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const localUser = localStorageService.getUserStorage();

  const requestToAPI = req.url.startsWith(environment.apiUrl);

  const authReq = requestToAPI
    ? req.clone({ withCredentials: true })
    : req;

  const handle401 = (error: HttpErrorResponse) => {
    if (error.status === 401 && localUser && !isRefreshing) {
      isRefreshing = true;

      return authService.refreshToken().pipe(
        switchMap((auth) => {
          localStorageService.setUserStorage(auth);
          return next(authReq);
        }),
        catchError((refreshErr) => {
          localStorageService.removeUsertorage();
          router.navigateByUrl('/');
          return throwError(() => refreshErr);
        }),
        finalize(() => {
          isRefreshing = false;
        })
      );
    }

    return throwError(() => error);
  };
  return next(authReq).pipe(catchError(handle401));

}