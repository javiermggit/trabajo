import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseResponse } from '../models/base-response';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
  ) {}

  get<T>(url: string): Observable<BaseResponse<T>>;
  get<T>(url: string, externalApi?: boolean): Observable<T>;
  get<T>(url: string, externalApi?: boolean, params?: HttpParams): Observable<BaseResponse<T>>;

  public get<T>(
    url: string,
    externalApi: boolean = false,
    parameters?: HttpParams,
  ): Observable<BaseResponse<T>> | Observable<T> {

    if (externalApi) {
      return this._httpClient.get<T>(url).pipe(
        map((res) => {
          if(!res){
            this.handleError(res)
          }
         return res
        }),
        catchError(this.handleError.bind(this)),
      );
    }

    if (parameters){
      return this._httpClient.get<BaseResponse<T>>(url, { params: parameters}).pipe(
        map((res) => {
          if(res.isError){
            this.handleError(res.mensajeError)
          }
         return res
        }),
        catchError(this.handleError.bind(this)),
      );
    }

    return this._httpClient.get<BaseResponse<T>>(url).pipe(
      tap((res) => {
        if(res.isError){
          this.handleError(res.mensajeError)
        }
      }),
      map((res) => {
        return res
      }),
      catchError(this.handleError.bind(this))
    );

  }

  public post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<BaseResponse<TResponse>> {
    console.log('post- service');
    
    return this._httpClient.post<BaseResponse<TResponse>>(url, body).pipe(
      map((res) => {
        if(res.isError){
          this.handleError(res.mensajeError)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  public put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<BaseResponse<TResponse>> {
    return this._httpClient.put<BaseResponse<TResponse>>(url, body).pipe(
      map((res) => {
        if(res.isError){
          this.handleError(res.mensajeError)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  public delete<TResponse>(
    url: string,
  ): Observable<BaseResponse<TResponse>> {
    return this._httpClient.delete<BaseResponse<TResponse>>(url).pipe(
      map((res) => {
        if(res.isError){
          this.handleError(res.mensajeError)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: any) {
    let messageError = this.errorMgmt(error);
    // this._customDialogService.showErrorDialog(messageError);
    return throwError(() => error);
  }

  public getFile(
    url: string,
    parameters?: HttpParams
  ): Observable<Blob> {
    return this._httpClient.get(url, {
      params: parameters,
      responseType: 'blob'  // 👈 indicamos que esperamos un blob (PDF)
    }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.statusText == 'Forbidden' || error.status == 403) {
      errorMessage = 'Su sesión a finalizado, ingrese nuevamente';
    } else if (error.status == 401) {
      errorMessage = 'No autorizado para esta función';
    } else if (error.status == 404) {
      errorMessage = 'No se ha encontrado';
    }else if (error.status == 0) {
      errorMessage = 'No se puede conectar al servicio';
    }else if (error.status == 500) {
      errorMessage = 'Ha ocurrido un error verifique e intente de nuevo. si el error consiste comuniquese con sistemas';
    } else if (error.error) {
      errorMessage = `${error.error}`;
    } else {
      errorMessage = `${error}`;
    }

    return errorMessage
  }
}
