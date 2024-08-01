import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {NavComponent} from "./nav/nav.component";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		FooterComponent,
		NavComponent,
		NgIf
	],
	templateUrl: './app.component.html',
})

export class AppComponent {

}
