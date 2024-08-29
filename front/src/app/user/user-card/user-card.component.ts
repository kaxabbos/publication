import {Component, Input, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {UserService} from "../user.service";
import {EnumService} from "../../enum.service";

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [
		FormsModule,
		NgForOf,
		KeyValuePipe
	],
	templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {

	@Input() user: any;

	roles = null;

	constructor(
		private userService: UserService,
		private enumService: EnumService,
	) {
	}

	ngOnInit() {
		this.enumService.enumSubject.subscribe(value => {
			this.roles = value.roles;
		})
	}

	setRole() {
		this.userService.setRole(this.user);
	}

	delete() {
		this.userService.delete(this.user);
	}
}
