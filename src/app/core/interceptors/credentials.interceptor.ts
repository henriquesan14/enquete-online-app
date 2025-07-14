import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export const CredentialsInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiUrl = environment.apiUrl;

  const isApiRequest = req.url.startsWith(apiUrl);

  const reqWithCredentials = isApiRequest
    ? req.clone({ withCredentials: true })
    : req;

  return next(reqWithCredentials);
};