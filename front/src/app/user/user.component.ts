import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import {UserService} from "./user.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {EnumService} from "../enum.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";

@Component({
	selector: 'app-user',
	standalone: true,
	imports: [
		UserCardComponent,
		NgIf,
		NgForOf,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

	users: any[] = [];

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private enumService: EnumService,
		private router: Router,
		private global: GlobalService,
	) {
	}

	getSortedUsers() {
		return this.users.sort((a: any, b: any) => {
			if (a.id > b.id) return -1;
			if (a.id < b.id) return 1;
			return 0;
		});
	}

	ngOnInit() {
		this.authService.getUserProfile().add(() => {
			if (this.global.getRole() !== 'ADMIN') this.router.navigate(['/login'])
		})

		this.userService.userSubject.subscribe(value => {
			this.users = value.users;
		})

		this.enumService.getRoles();
		this.userService.getUsers();
	}

	getUserId() {
		return this.global.getUserId();
	}
}
