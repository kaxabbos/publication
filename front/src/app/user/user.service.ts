import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})

export class UserService {

	userSubject = new BehaviorSubject<any>({
		users: [],
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
		private http: HttpClient,
		private router: Router,
	) {
	}

	getUsers() {
		return this.http.get(
			this.backendUrl + '/users',
			{headers: this.headersWithToken}
		).subscribe({
			next: ((res: any) => {
				this.userSubject.next({
					...this.userSubject.value,
					users: res.data,
				});
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}

	setRole(user: any) {
		return this.http.patch(
			this.backendUrl + `/users/${user.id}/role`,
			"",
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({role: user.nextRole})
			}
		).subscribe({
			next: ((res: any) => {
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}

	userDelete(user: any) {
		return this.http.delete(
			this.backendUrl + `/users/${user.id}`,
			{headers: this.headersWithToken}
		).subscribe({
			next: ((res) => {
				let current = this.userSubject.value;
				let updated = current.users.filter((i: any) => i.id !== user.id);
				this.userSubject.next({
					...current,
					users: updated
				});
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}


}
