import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegComponent} from "./auth/reg/reg.component";
import {UserComponent} from "./user/user.component";
import {ErrorComponent} from "./error/error.component";
import {StatsComponent} from "./stats/stats.component";
import {PublicationComponent} from "./publication/publication.component";
import {PublicationAddComponent} from "./publication/publication-add/publication-add.component";
import {PublicationPageComponent} from "./publication/publication-page/publication-page.component";
import {PublicationUpdateComponent} from "./publication/publication-update/publication-update.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
	{path: "", component: MainComponent},

	{path: "reg", component: RegComponent},
	{path: "login", component: LoginComponent},

	{path: "profile", component: ProfileComponent},

	{path: "users", component: UserComponent},

	{path: "stats", component: StatsComponent},

	{path: "publications", component: PublicationComponent},
	{path: "publication", component: PublicationPageComponent},
	{path: "publicationAdd", component: PublicationAddComponent},
	{path: "publicationUpdate", component: PublicationUpdateComponent},

	{path: "error", component: ErrorComponent},
	{path: "**", component: ErrorComponent},
];
