import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIs } from '../constant/api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceParIpsService {

 	constructor(
		private http: HttpClient,
		private _apiService: ApiService,
	) {
    this.getParIps();
	}

  	getParIps() {
		/* const url = APIs.pais.getParIps;
		return this.http.get<any>(url); */
	}
}
