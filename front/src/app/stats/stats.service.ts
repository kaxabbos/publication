import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
		private http: HttpClient
	) {
	}

	getStatsUsers() {
		return this.http.get(
			this.backendUrl + '/stats/users',
			{headers: this.headersWithToken}
		);
	}

	getProfile() {
		return this.http.get(
			this.backendUrl + '/stats/profile',
			{headers: this.headersWithToken}
		);
	}

}
