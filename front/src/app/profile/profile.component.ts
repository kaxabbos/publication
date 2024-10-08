import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {StatsService} from "../stats/stats.service";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Component({

	selector: 'app-profile',
	standalone: true,
	imports: [
		NgIf,
		FormsModule
	],
	templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

	profile: any = {
		username: ''
	};
	waiting: any = 0;
	done: any = 0;
	reject: any = 0;

	constructor(
		private authService: AuthService,
		private router: Router,
		private statsService: StatsService,
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.getRole() === 'NOT') this.router.navigate(['/login']);
		})

		this.authService.getProfile().subscribe({
			next: ((res: any) => {
				this.profile = res.data;
			}),
			error: ((e: any) => {
				console.log("error", e);
			})
		})

		if (this.getRole() === 'USER') {
			this.statsService.getProfile().subscribe({
				next: ((res: any) => {
					let waiting: any = document.getElementById('waiting');
					let done: any = document.getElementById('done');
					let reject: any = document.getElementById('reject');

					const r: any = res.data;

					this.waiting = r[0].name + ': ' + r[0].count + ' | ~' + r[0].percent + '%';
					waiting.style.width = r[0].percent + '%';

					this.done = r[1].name + ': ' + r[1].count + ' | ~' + r[1].percent + '%';
					done.style.width = r[1].percent + '%';

					this.reject = r[2].name + ': ' + r[2].count + ' | ~' + r[2].percent + '%';
					reject.style.width = r[2].percent + '%';
				}),
				error: ((e) => {
					console.log("error", e);
				})
			})
		}
	}

	getRole() {
		return this.global.role;
	}

	updateImg(event: any) {
		let file = event.target.files[0]
		let formData = new FormData();
		formData.append('file', file, file.name);
		this.http.patch(
			this.global.backendURL + `/users/img`,
			formData,
			{headers: this.global.headersMultipartToken},
		).subscribe({
			next: ((res: any) => {
				this.profile = res.data;
			}),
			error: ((e: any) => {
				console.log("error", e);
			})
		});
	}
}
