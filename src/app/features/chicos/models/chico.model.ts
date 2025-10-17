import { Micro } from "./micro.model";

export interface Chico {
    dni: string;
    nombre: string;
    apellido: string;
    estaAsignado: boolean;
    createdAt: string;
    micro: Micro;
}