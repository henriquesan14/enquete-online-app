import { Route } from "@angular/router";
import { Login } from "./login/login";
import { Callback } from "./callback/callback";

export const AUTH_ROUTES: Route[] = [
  {path: 'login', component: Login},
  {path: 'auth/callback', component: Callback}
];