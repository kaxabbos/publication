import {Component, Input} from '@angular/core';

@Component({
	selector: 'app-stats-users',
	standalone: true,
	imports: [],
	templateUrl: './stats-users.component.html',
})
export class StatsUsersComponent {
	@Input() username: any;
	@Input() data: any;
}
