import { UserType } from './../../Types/User.types'
import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'app-view-admins',
	templateUrl: './view-admins.component.html',
	styleUrls: ['./view-admins.component.scss'],
})
export class ViewAdminsComponent implements OnInit {
	constructor(private user: UserService) {}

	admins: UserType[] = []
	currentAdmin: UserType | any = {}

	ngOnInit(): void {
		this.getAdmins()
	}

	getAdmins() {
		this.user.index().subscribe((pages: any) => {
			this.admins = pages.data
		})
	}
}
