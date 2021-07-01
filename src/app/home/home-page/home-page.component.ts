import { Component, OnInit } from '@angular/core'
import { HomeNavType } from 'src/app/Types/navs/HomeNav.type'
import { homeNavs } from '../homeNav'

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	navs = homeNavs

	title: String = 'News'

	setTitle(title: String) {
		this.title = title
	}
}
