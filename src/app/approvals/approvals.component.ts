import { Component, OnInit } from '@angular/core'
import { Alert } from '../components/Alert'

@Component({
	selector: 'app-approvals',
	templateUrl: './approvals.component.html',
	styleUrls: ['./approvals.component.scss'],
})
export class ApprovalsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	alert1() {
		Alert('aw', '', 'success')
	}
}
