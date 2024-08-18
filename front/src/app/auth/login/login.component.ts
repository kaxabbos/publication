import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgIf
	],
	templateUrl: './login.component.html',
})

export class LoginComponent {

	message = "";

	loginForm = new FormGroup({
		username: new FormControl("", [Validators.required]),
		password: new FormControl("", [Validators.required]),
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
	) {
	}

	loginFormSubmit() {
		this.authService.login(this.loginForm.value).subscribe({
			next: ((res) => {
				this.global.set(res.data.user.id, res.data.user.role, res.data.token);
				this.router.navigate(['/']);
			}),
			error: ((error) => {
				console.log("error", error);
				if (error.status === 0) this.message = "Сервер не работает";
				else this.message = error.error.message;
			})
		});
	}
}
