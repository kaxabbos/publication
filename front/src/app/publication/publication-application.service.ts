import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class PublicationApplicationService {

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	addApplication(id: any, description: any) {
		return this.http.post(
			this.global.getBackendUrl() + `/publications/${id}/applications`,
			"",
			{
				headers: this.global.getHeadersWithToken(),
				params: new HttpParams().appendAll({
					description: description,
				}),
			}
		)
	}

	doneApplication(id: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/applications/${id}/done`,
			{headers: this.global.getHeadersWithToken(),}
		)
	}

	rejectApplication(id: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/applications/${id}/reject`,
			{headers: this.global.getHeadersWithToken(),}
		)
	}

}
