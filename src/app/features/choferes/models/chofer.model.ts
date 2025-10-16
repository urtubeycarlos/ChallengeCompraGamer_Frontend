import { Micro } from "./micro.model";

export interface Chofer {
    dni: string;
    nombre: string;
    apellido: string;
    claseLicencia: string;
    telefono: number;
    estaAsignado: boolean;
    createdAt: string;
    micro: Micro;
}