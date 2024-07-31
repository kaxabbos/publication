import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

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
		private router: Router
	) {
	}

	login(user: any) {
		return this.http.post<any>(
			this.backendUrl + '/users/login',
			"",
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
				}
			}
		)
	}

	reg(user: any) {
		return this.http.post<any>(
			this.backendUrl + '/users',
			user,
			{headers: this.headers}
		)
	}

	getUserProfile() {
		return this.http.get<any>(
			this.backendUrl + '/users/profile',
			{headers: this.headersWithToken}
		).subscribe({
			next: ((res) => {
				localStorage.setItem("id", res.data.id);
				localStorage.setItem("role", res.data.role);
			}),
			error: ((error) => {
				console.log("error", error);
				localStorage.setItem("id", "0");
				localStorage.setItem("role", "NOT");
				localStorage.setItem("token", "");
				localStorage.setItem("locationReload", "0");
			})
		});
	}

	getProfile() {
		return this.http.get<any>(
			this.backendUrl + '/users/profile',
			{headers: this.headersWithToken}
		);
	}

	getUserId() {
		return localStorage.getItem('id') !== null ? Number(localStorage.getItem('id')) : 0;
	}

	getRole() {
		return localStorage.getItem("role") !== null ? localStorage.getItem("role") : 'NOT';
	}

	logout() {
		localStorage.setItem("id", "0");
		localStorage.setItem("role", "NOT");
		localStorage.setItem("token", "");
		localStorage.setItem("locationReload", "0");
		this.router.navigate(['/login'])
	}
}
