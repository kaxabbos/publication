import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class PublicationApplicationService {

	private backendUrl = 'http://localhost:8080';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});
	private headersMultipartWithToken = new HttpHeaders({
		'enctype': 'multipart/form-data',
		'Authorization': 'Bearer ' + localStorage.getItem("token"),
	});
	private headersWithToken = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("token"),
	});

	constructor(
		private http: HttpClient,
	) {
	}

	addApplication(id: any, description: any) {
		return this.http.post(
			this.backendUrl + `/publications/${id}/applications`,
			"",
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({
					description: description,
				}),
			}
		)
	}

	doneApplication(id: any) {
		return this.http.get(
			this.backendUrl + `/applications/${id}/done`,
			{headers: this.headersWithToken,}
		)
	}

	rejectApplication(id: any) {
		return this.http.get(
			this.backendUrl + `/applications/${id}/reject`,
			{headers: this.headersWithToken,}
		)
	}

}
