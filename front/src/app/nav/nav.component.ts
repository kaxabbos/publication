import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [
		NgIf,
	],
	templateUrl: './nav.component.html',
})
export class NavComponent {

	constructor(
		public authService: AuthService,
		public router: Router,
	) {
	}

	getRole() {
		return this.authService.getRole();
	}
}
