export interface BaseResponse<T> {
  isError: boolean,
  isSuccess: boolean,
  statusCode: number,
  data: T,
  mensaje: string,
  exceptionMessage: string,
  mensajeError: string | null,
  errors: any
}

export interface BaseError {
  nombrePropiedad?: string;
  mensajeError?: string;
}

export interface BaseError {
  nombrePropiedad?: string;
  mensajeError?: string;
}

