import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	getStatsUsers() {
		return this.http.get(
			this.global.backendURL + '/stats/users',
			{headers: this.global.headersToken}
		);
	}

	getProfile() {
		return this.http.get(
			this.global.backendURL + '/stats/profile',
			{headers: this.global.headersToken}
		);
	}

}
