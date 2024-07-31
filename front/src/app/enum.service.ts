import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class EnumService {

	enumSubject = new BehaviorSubject<any>({
		roles: null,
	})
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

	getRoles() {
		this.http.get(
			this.backendUrl + '/enums/roles',
			{headers: this.headers}
		).subscribe({
			next: ((res: any) => {
				this.enumSubject.next({
					roles: res.data,
				});
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		})
	}
}
