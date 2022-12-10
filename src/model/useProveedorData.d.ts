import { GridColumns } from '@mui/x-data-grid-premium';
export declare type Proveedor = {
    id: number;
    nombre: string;
    razonsocial: string;
    direccion: string;
};
export declare const useProveedorData: () => {
    rows: Proveedor[];
    columns: GridColumns<any>;
};
