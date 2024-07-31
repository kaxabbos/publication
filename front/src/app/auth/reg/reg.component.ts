import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
	selector: 'app-reg',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './reg.component.html',
})
export class RegComponent {

	message = "";

	regForm = new FormGroup({
		username: new FormControl("", [Validators.required]),
		password: new FormControl("", [Validators.required]),
	})

	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}

	regFormSubmit() {
		this.authService.reg(this.regForm.value).subscribe({
			next: ((resReg) => {
				this.authService.login(this.regForm.value).subscribe({
					next: ((res) => {
						localStorage.setItem("id", res.data.user.id);
						localStorage.setItem("role", res.data.user.role);
						localStorage.setItem("token", res.data.token);
						localStorage.setItem("locationReload", "0");

						this.router.navigate(['/']);
					}),
					error: ((error) => {
						console.log("error", error);
						if (error.status === 0) this.message = "Сервер не работает";
						else this.message = error.error.message;
					})
				});

			}),
			error: ((error) => {
				console.log("error", error);
				if (error.status === 0) this.message = "Сервер не работает";
				else this.message = error.error.message;
			})
		});
	}

}
