import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	constructor() {
	}

	getUserId() {
		return Number(localStorage.getItem('id')) || 0;
	}

	getRole() {
		return localStorage.getItem("role") || 'NOT';
	}

	getToken() {
		return localStorage.getItem("token") || '';
	}

	getBackendUrl() {
		return 'http://localhost:8080';
	}

	getHeaders() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
		});
	}

	getHeadersMultipartWithToken() {
		return new HttpHeaders({
			'enctype': 'multipart/form-data',
			'Authorization': 'Bearer ' + this.getToken(),
		});
	}

	getHeadersWithToken() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.getToken(),
		});
	}

}
