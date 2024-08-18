import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})

export class GlobalService {

	private _userid: number = 0;
	private _role: string = 'NOT';
	private _token: string = '';
	private _backendURL: string = 'http://localhost:8080';

	public set(userid: number, role: string, token: string) {
		this.userid = userid;
		this.role = role;
		this.token = token;
	}

	public clear() {
		this.userid = 0;
		this.role = 'NOT';
		this.token = '';
	}

	get userid(): number {
		return this._userid;
	}

	set userid(value: number) {
		this._userid = value;
	}

	get role(): string {
		return this._role;
	}

	set role(value: string) {
		this._role = value;
	}

	get token(): string {
		return this._token;
	}

	set token(value: string) {
		this._token = value;
	}

	get backendURL(): string {
		return this._backendURL;
	}

	getHeadersMultipartWithToken() {
		return new HttpHeaders({
			'enctype': 'multipart/form-data',
			'Authorization': 'Bearer ' + this.token,
		});
	}

	getHeadersWithToken() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.token,
		});
	}

	getHeadersJsonWithToken() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.token,
		});
	}
}
