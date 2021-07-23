import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RecordNavType } from 'src/app/Types/navs/RecordNav.types'
import { recordNavs } from '../../RecordNav'
import { recordNavChoices } from '../../RecordNavChoices'

@Component({
	selector: 'app-record-index',
	templateUrl: './record-index.component.html',
	styleUrls: ['./record-index.component.scss'],
})
export class RecordIndexComponent implements OnInit {
	constructor(private router: Router) {}

	url = this.router.url

	ngOnInit(): void {}

	navs: any[] = recordNavChoices

	title: String = 'Upload a File'

	handleChangeTab(title: String) {
		this.title = title
		setTimeout(() => {
			this.url = this.router.url
		}, 100)
	}
}
