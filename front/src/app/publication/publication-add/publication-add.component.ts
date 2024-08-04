import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../publication.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-publication-add',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './publication-add.component.html',
})
export class PublicationAddComponent implements OnInit {

	publication = new FormGroup({
		name: new FormControl("", Validators.required),
		price: new FormControl("", [Validators.required, Validators.min(0.01)]),
		description: new FormControl("", Validators.required),
	})

	message: any;

	constructor(
		public router: Router,
		private publicationService: PublicationService,
		private authService: AuthService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.getRole() !== 'USER') this.router.navigate(['/login']);
		})
	}

	addPublication() {
		this.publicationService.addPublication(this.publication.value).subscribe({
			next: ((res: any) => {
				this.router.navigate(['/publication'], {queryParams: {id: res.data.id}});
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}
}
