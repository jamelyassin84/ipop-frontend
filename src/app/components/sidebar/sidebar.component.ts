import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SidebarType } from 'src/app/Types/navs/Sidebar.types'
import { Alert, Fire } from '../Alert'
import { ADMIN } from './Sidebar'

@Component({
	selector: 'Sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	constructor(private router: Router) {}

	url = this.router.url

	ngOnInit(): void {}

	sidebar: SidebarType[] = ADMIN

	handleChangeTab() {
		setTimeout(() => {
			this.url = this.router.url
		}, 100)
	}

	logout() {
		Fire('Logout?', 'Are you sure you want to log-out?', 'info', () => {
			this.router.navigate([''])
			Alert('Thank you', `For using Iloilo Provincial Office's Automated System`, 'success')
		})
	}
}
