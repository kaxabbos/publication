import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {PublicationService} from "../publication.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PublicationApplicationService} from "../publication-application.service";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-publication-page',
	standalone: true,
	imports: [
		NgIf,
		FormsModule
	],
	templateUrl: './publication-page.component.html',
})
export class PublicationPageComponent implements OnInit {
	id: any;
	publication: any = {
		name: ''
	};
	message: any;
	note: any = '';
	description: any = '';

	constructor(
		private activatedRoute: ActivatedRoute,
		public router: Router,
		private authService: AuthService,
		private publicationService: PublicationService,
		private applicationService: PublicationApplicationService,
		private global: GlobalService
	) {
	}

	getApplications(): any {
		let applications = this.publication === null ? [] : this.publication.applications;
		applications.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
		if (this.getUserId() !== this.getOwnerId() && this.getRole() === 'USER') {
			applications = applications.filter((i: any) => i.ownerId === this.getUserId());
		}
		return applications
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.role === 'NOT') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
		})

		this.publicationService.findById(this.id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				if (e.error.code === 404) {
					this.router.navigate(
						['/error'],
						{
							queryParams: {
								message: e.error.message,
							}
						}
					);
				} else {
					this.router.navigate(['/login'])
				}
			})
		})
	}

	getRole() {
		return this.global.role;
	}

	getUserId() {
		return this.global.userid;
	}

	getOwnerId() {
		return this.publication.ownerId;
	}

	updatePublicationPage() {
		this.router.navigate(
			['/publicationUpdate'],
			{queryParams: {id: this.id}}
		);
	}

	deletePublication() {
		this.publicationService.deletePublication(this.id).subscribe({
			next: ((res: any) => {
				this.router.navigate(['/publications']);
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateImg(event: any) {
		this.publicationService.updateImg(event.target.files[0], this.id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateStatusDone() {
		this.publicationService.updateStatusDone(this.id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateStatusClosed() {
		this.publicationService.updateStatusClosed(this.id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateStatusWaiting() {
		this.publicationService.updateStatusWaiting(this.id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateStatusCorrection() {
		this.publicationService.updateStatusCorrection(this.id, this.note).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	addApplication() {
		this.applicationService.addApplication(this.id, this.description).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	doneApplication(id: any) {
		this.applicationService.doneApplication(id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	rejectApplication(id: any) {
		this.applicationService.rejectApplication(id).subscribe({
			next: ((res: any) => {
				this.publication = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}
}
