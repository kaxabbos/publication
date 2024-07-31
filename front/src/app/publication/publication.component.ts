import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {PublicationService} from "./publication.service";
import {PublicationCardComponent} from "./publication-card/publication-card.component";

@Component({
	selector: 'app-publication',
	standalone: true,
	imports: [
		NgIf,
		ReactiveFormsModule,
		FormsModule,
		PublicationCardComponent
	],
	templateUrl: './publication.component.html',
})
export class PublicationComponent implements OnInit {

	publications: any[] = []
	name = '';
	filter = 0;
	filter2 = 0;

	constructor(
		public router: Router,
		private publicationService: PublicationService,
		private authService: AuthService,
	) {
	}

	getPublications() {
		let res = this.publications;

		res = res.filter(value => value.name.includes(this.name));

		if (this.filter == 0) res = res.sort((a, b) => (a.id < b.id ? 1 : -1));
		else if (this.filter == 1) res = res.sort((a, b) => (a.id > b.id ? 1 : -1));
		else if (this.filter == 2) res = res.sort((a, b) => (a.price > b.price ? 1 : -1));
		else if (this.filter == 3) res = res.sort((a, b) => (a.price < b.price ? 1 : -1));
		else if (this.filter == 4) res = res.sort((a, b) => (a.name > b.name ? 1 : -1));
		else if (this.filter == 5) res = res.sort((a, b) => (a.name < b.name ? 1 : -1));

		if (this.filter2 == 0) res = res.filter(value => value.status === 'DONE');
		else if (this.filter2 == 1) res = res.filter(value => value.ownerId === this.getUserId());
		else if (this.filter2 == 2) res = res.filter(value => value.status === 'WAITING');
		else if (this.filter2 == 3) res = res.filter(value => value.status !== 'DONE');

		return res;
	}

	ngOnInit(): void {
		this.publicationService.publicationSubject.subscribe(value => {
			this.publications = value.publications;
		})

		this.publicationService.findAll();
	}

	getRole() {
		return this.authService.getRole();
	}

	getUserId() {
		return this.authService.getUserId();
	}

}
