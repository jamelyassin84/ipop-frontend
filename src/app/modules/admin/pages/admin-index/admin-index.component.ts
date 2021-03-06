import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AdminNav } from '../../AdminNav'

@Component({
	selector: 'app-admin-index',
	templateUrl: './admin-index.component.html',
	styleUrls: ['./admin-index.component.scss'],
})
export class AdminIndexComponent implements OnInit {
	constructor(private router: Router) {}

	url = this.router.url

	ngOnInit(): void {}

	navs: any[] = AdminNav

	title: String = 'View Administrators'

	handleChangeTab(title: String) {
		this.title = title
		setTimeout(() => {
			this.url = this.router.url
		}, 100)
	}
}
