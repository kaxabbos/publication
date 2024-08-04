import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {KeyValuePipe, NgIf} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";
import {StatsService} from "./stats.service";
import {StatsUsersComponent} from "./stats-users/stats-users.component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {GlobalService} from "../global.service";

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [
		NgApexchartsModule,
		NgIf,
		KeyValuePipe,
		StatsUsersComponent,
	],
	templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

	map: any;

	constructor(
		private authService: AuthService,
		private router: Router,
		private statsService: StatsService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.getRole() !== 'ADMIN') this.router.navigate(['/login']);
		})

		this.statsService.getStatsUsers().subscribe({
			next: ((res: any) => {
				this.map = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
			})
		})
	}

	exportAsPDF() {
		let data: any = document.getElementById('pdf');
		html2canvas(data).then(canvas => {
			const content = canvas.toDataURL('image/png');

			let jsPdf;
			if (canvas.width > canvas.height) {
				jsPdf = new jsPDF('p', 'cm', 'a4');
				jsPdf.addImage(content, 'PNG', 0, 0, 21, 0);
			} else {
				jsPdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
				jsPdf.addImage(content, 'PNG', 0, 0, canvas.width, canvas.height);
			}

			jsPdf.save('pdf.pdf');
		});
	}
}
