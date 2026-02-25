import { Observable, of, throwError } from 'rxjs';
import { retryWhen, delay, mergeMap } from 'rxjs/operators';

const getErrorMessage = (maxRetry:number) =>'se querbro reintentando';
const DEFAULT_MAX_RETRIES =5;

export function delayedRetry(delayMs:number,maxRetry = DEFAULT_MAX_RETRIES){
let retries = maxRetry;
return(src:Observable<any>)=>
  src.pipe(
    retryWhen((errors:Observable<any>)=> errors.pipe(
      delay(delayMs),
      mergeMap(error=> retries-->0?of(error):throwError(getErrorMessage(maxRetry))
      ))
    )
  );

}