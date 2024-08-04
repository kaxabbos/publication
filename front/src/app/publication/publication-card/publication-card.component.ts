import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";

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
		private global: GlobalService,
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
		return this.global.getRole();
	}

	getUserId() {
		return this.global.getUserId();
	}
}
