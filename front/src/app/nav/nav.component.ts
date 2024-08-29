import {Component} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {NavigateDirective} from "../navigate.directive";

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [
		NgIf,
		NavigateDirective,
	],
	templateUrl: './nav.component.html',
})
export class NavComponent {

	constructor(
		public authService: AuthService,
		public router: Router,
		private global: GlobalService,
	) {
	}

	getRole() {
		return this.global.role;
	}

	logout() {
		this.authService.logout();
	}
}
