import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class PublicationService {

	publicationSubject = new BehaviorSubject<any>({
		publications: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	findAll() {
		this.http.get(
			this.global.getBackendUrl() + '/publications',
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
			this.global.getBackendUrl() + `/publications/${id}`,
			{headers: this.global.getHeadersWithToken()},
		);
	}

	addPublication(publication: any) {
		return this.http.post(
			this.global.getBackendUrl() + '/publications',
			publication,
			{headers: this.global.getHeadersJsonWithToken()},
		);
	}

	deletePublication(id: any) {
		return this.http.delete(
			this.global.getBackendUrl() + `/publications/${id}`,
			{headers: this.global.getHeadersWithToken()},
		)
	}

	updatePublication(publication: any, id: any) {
		return this.http.put(
			this.global.getBackendUrl() + `/publications/${id}`,
			publication,
			{headers: this.global.getHeadersJsonWithToken()},
		);
	}

	updateImg(file: any, id: any) {
		let formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.global.getBackendUrl() + `/publications/${id}/img`,
			formData,
			{headers: this.global.getHeadersMultipartWithToken()},
		);
	}

	updateStatusDone(id: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/publications/${id}/status/done`,
			{headers: this.global.getHeadersWithToken()},
		);
	}

	updateStatusClosed(id: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/publications/${id}/status/closed`,
			{headers: this.global.getHeadersWithToken()},
		);
	}

	updateStatusWaiting(id: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/publications/${id}/status/waiting`,
			{headers: this.global.getHeadersWithToken()},
		);
	}

	updateStatusCorrection(id: any, note: any) {
		return this.http.get(
			this.global.getBackendUrl() + `/publications/${id}/status/correction`,
			{
				headers: this.global.getHeadersWithToken(),
				params: new HttpParams().appendAll({
					note: note
				})
			},
		);
	}
}

