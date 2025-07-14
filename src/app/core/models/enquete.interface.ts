import { OpcaoEnquete } from "./opcao-enquete.interface"

export interface Enquete {
    id: string
    titulo: string
    descricao: string
    encerramento: string
    opcoes: OpcaoEnquete[]
    createdBy: string
  }