import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	private backendUrl = 'http://localhost:8080';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});
	private headersWithToken = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("token"),
	});

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	getStatsUsers() {
		return this.http.get(
			this.global.backendURL + '/stats/users',
			{headers: this.global.getHeadersWithToken()}
		);
	}

	getProfile() {
		return this.http.get(
			this.global.backendURL + '/stats/profile',
			{headers: this.global.getHeadersWithToken()}
		);
	}

}
