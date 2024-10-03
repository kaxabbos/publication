import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {GlobalService} from "../../global.service";

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
		private router: Router,
		private global: GlobalService,
	) {
	}

	regFormSubmit() {
		this.authService.reg(this.regForm.value);
	}

}
