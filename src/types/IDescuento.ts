export interface IDescuento {
  id?: string;
  fechaInicio: string;
  fechaCierre: string;
  descuento: number;
  habilitado?: boolean;
}
