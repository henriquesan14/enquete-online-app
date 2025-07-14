import { Route } from "@angular/router";
import { ListagemEnquetes } from "./listagem-enquetes/listagem-enquetes";

export const ENQUETE_ROUTES: Route[] = [
  {path: '', component: ListagemEnquetes},
];