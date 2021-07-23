import { BarangayOfficialType } from '../../../../../../../Types/officials/BarangayOfficials.types'
import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'BarangayOfficialApproval',
	templateUrl: './approval-barangay-officials.component.html',
	styleUrls: ['./approval-barangay-officials.component.scss'],
})
export class ApprovalBarangayOfficialsComponent implements OnInit {
	constructor() {}

	@Input() data: BarangayOfficialType | any = ''

	ngOnInit(): void {}
}
