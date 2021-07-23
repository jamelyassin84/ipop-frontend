import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor(private user: UserService) {}

	isUser = !this.user.isAdmin()
	ngOnInit(): void {}
}
