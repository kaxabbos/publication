import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	login(user: any) {
		 this.http.post<any>(
			this.global.backendURL + '/users/login',
			"",
			{headers: {'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)}}
		).subscribe({
			next: ((res) => {
				this.global.set(res.data.user.id, res.data.user.role, res.data.token);
				this.router.navigate(['/']);
			}),
			error: ((e) => {
				console.log("error", e);
				if (e.status === 0) this.alert.showAlertMessage("Сервер не работает")
				else this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	reg(user: any) {
		 this.http.post<any>(
			this.global.backendURL + '/users',
			user,
		).subscribe({
			next: (() => {
				this.login(user);
			}),
			error: ((e) => {
				console.log("error", e);
				if (e.status === 0) this.alert.showAlertMessage("Сервер не работает")
				else this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	getUserProfile() {
		return this.http.get<any>(
			this.global.backendURL + '/users/profile',
			{headers: this.global.headersToken}
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
		console.log(this.global.headersJsonToken.get('Authorization'));
		return this.http.get<any>(
			this.global.backendURL + '/users/profile',
			{headers: this.global.headersToken}
		);
	}

	logout() {
		this.global.clear()
		this.router.navigate(['/login'])
	}
}
