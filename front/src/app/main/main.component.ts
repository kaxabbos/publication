import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [],
	templateUrl: './main.component.html',
})

export class MainComponent implements OnInit {
	ngOnInit(): void {
		if (localStorage.getItem("locationReload") === null) {
			localStorage.setItem("locationReload", '0');
		}
		if (localStorage.getItem('locationReload') === '0') {
			window.location.reload();
			localStorage.setItem("locationReload", '1');
		}
	}
}
