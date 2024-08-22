import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../publication.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-publication-update',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './publication-update.component.html',
})
export class PublicationUpdateComponent implements OnInit {

	id: any;

	publication = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl("", [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	file: any = null;

	message: any;

	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		private publicationService: PublicationService,
		private authService: AuthService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.role !== 'USER') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
		})

		this.publicationService.findById(this.id).subscribe({
			next: ((res: any) => {
				this.publication.setValue({
					name: res.data.name,
					price: res.data.price,
					description: res.data.description,
				})
			}),
			error: ((e) => {
				console.log("error", e);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: e.error.message,
						}
					}
				);
			})
		})

	}

	updatePublication() {
		this.publicationService.updatePublication(this.publication.value, this.id).subscribe({
			next: (() => {
				if (this.file !== null) {
					this.publicationService.updateImg(this.file, this.id).subscribe({
						next: (() => {
							this.publicationPage()
						}),
						error: ((e) => {
							console.log("error", e);
							this.message = e.error.message;
						})
					})
				} else {
					this.publicationPage()

				}
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	publicationPage() {
		this.router.navigate(['/publication'], {queryParams: {id: this.id}});
	}

	updateImg(event: any) {
		this.file = event.target.files[0];
	}
}
