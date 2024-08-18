import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private global: GlobalService,
	) {
	}

	login(user: any) {
		return this.http.post<any>(
			this.global.backendURL + '/users/login',
			"",
			{
				headers: {
					'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
				}
			}
		)
	}

	reg(user: any) {
		return this.http.post<any>(
			this.global.backendURL + '/users',
			user,
		)
	}

	getUserProfile() {
		return this.http.get<any>(
			this.global.backendURL + '/users/profile',
			{headers: this.global.getHeadersWithToken()}
		).subscribe({
			next: ((res: any) => {
				this.global.role = res.data.role;
			}),
			error: (() => {
				localStorage.clear()
			})
		});
	}

	getProfile() {
		console.log(localStorage.getItem('token'));
		console.log(this.global.getHeadersJsonWithToken().get('Authorization'));
		return this.http.get<any>(
			this.global.backendURL + '/users/profile',
			{headers: this.global.getHeadersWithToken()}
		);
	}

	logout() {
		this.global.clear()
		this.router.navigate(['/login'])
	}
}
