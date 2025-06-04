export interface IDescuento {
  id?: string;
  fechaInicio: string;
  fechaCierra: string;
  descuento: number;
  habilitado?: boolean;
}
