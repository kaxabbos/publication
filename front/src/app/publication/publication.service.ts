import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class PublicationService {

	publicationSubject = new BehaviorSubject<any>({
		publications: [],
	})
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

	findAll() {
		this.http.get(
			this.backendUrl + '/publications',
			{headers: this.headers},
		).subscribe({
			next: ((res: any) => {
				this.publicationSubject.next({
					...this.publicationSubject.value,
					publications: res.data,
				})
			}),
			error: (e: any) => {
				console.log("error", e);
			}
		})
	}

	findById(id: any) {
		return this.http.get(
			this.backendUrl + `/publications/${id}`,
			{headers: this.headersWithToken},
		);
	}

	addPublication(publication: any) {
		return this.http.post(
			this.backendUrl + '/publications',
			publication,
			{headers: this.headersWithToken},
		);
	}

	deletePublication(id: any) {
		return this.http.delete(
			this.backendUrl + `/publications/${id}`,
			{headers: this.headersWithToken},
		)
	}

	updatePublication(publication: any, id: any) {
		return this.http.put(
			this.backendUrl + `/publications/${id}`,
			publication,
			{headers: this.headersWithToken},
		);
	}

	updateImg(file: any, id: any) {
		let formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.backendUrl + `/publications/${id}/img`,
			formData,
			{headers: this.headersMultipartWithToken},
		);
	}

	updateStatusDone(id: any) {
		return this.http.get(
			this.backendUrl + `/publications/${id}/status/done`,
			{headers: this.headersWithToken},
		);
	}

	updateStatusClosed(id: any) {
		return this.http.get(
			this.backendUrl + `/publications/${id}/status/closed`,
			{headers: this.headersWithToken},
		);
	}

	updateStatusWaiting(id: any) {
		return this.http.get(
			this.backendUrl + `/publications/${id}/status/waiting`,
			{headers: this.headersWithToken},
		);
	}

	updateStatusCorrection(id: any, note: any) {
		return this.http.get(
			this.backendUrl + `/publications/${id}/status/correction`,
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({
					note: note
				})
			},
		);
	}
}

