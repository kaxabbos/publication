import {Component, OnInit} from '@angular/core';
import {PublicationService} from "../publication.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-publication-add',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgIf,
		NavigateDirective
	],
	templateUrl: './publication-add.component.html',
})
export class PublicationAddComponent implements OnInit {

	publication = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl("", [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})
	file: any = null;

	constructor(
		public router: Router,
		private publicationService: PublicationService,
		private authService: AuthService,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.role !== 'USER') this.router.navigate(['/login']);
		})
	}

	save() {
		this.publicationService.save(this.publication.value).subscribe({
			next: ((res: any) => {
				this.publicationService.updateImg(this.file, res.data.id).subscribe({
					next: (() => {
						this.router.navigate(['/publication'], {queryParams: {id: res.data.id}});
					}),
					error: ((e) => {
						console.log("error", e);
						this.alert.showAlertMessage(e.error.message);
					})
				})
			}),
			error: ((e) => {
				console.log("error", e);
				this.alert.showAlertMessage(e.error.message);
			})
		})
	}

	updateImg(event: any) {
		this.file = event.target.files[0];
	}
}
