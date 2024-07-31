import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-publication-card',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './publication-card.component.html',
})
export class PublicationCardComponent {

	@Input() publication: any;

	constructor(
		private router: Router,
		private authService: AuthService,
	) {
	}

	publicationPage(id: any) {
		this.router.navigate(
			['/publication'],
			{
				queryParams: {
					id: id,
				}
			}
		);
	}

	getRole() {
		return this.authService.getRole();
	}

	getUserId() {
		return this.authService.getUserId();
	}
}
