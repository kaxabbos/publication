import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-publication-card',
	standalone: true,
	imports: [
		NgIf,
		NavigateDirective
	],
	templateUrl: './publication-card.component.html',
})
export class PublicationCardComponent {

	@Input() publication: any;

	constructor(
		private global: GlobalService,
	) {
	}

	get role() {
		return this.global.role;
	}

	get userid() {
		return this.global.userid;
	}
}
