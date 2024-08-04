import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [],
	templateUrl: './main.component.html',
})

export class MainComponent implements OnInit{
	constructor(
		private authService: AuthService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile();
	}
}
