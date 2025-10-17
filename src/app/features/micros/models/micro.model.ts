import { Chico } from "./chico.model";
import { Chofer } from "./chofer.model";

export interface Micro {
    patente: string;
    marca: string;
    modelo: string;
    cantidadAsientos: number;
    cantidadAsientosOcupados: number;
    estaCompleto: boolean;
    tieneChofer: boolean;
    tieneChicos: boolean;
    createdAt: string;
    updatedAt: string;
    chofer: Chofer | null;
    chicos: Chico[];
}