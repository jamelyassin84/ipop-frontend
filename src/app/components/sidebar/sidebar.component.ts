import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SidebarType } from 'src/app/Types/navs/Sidebar.types'
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
}
