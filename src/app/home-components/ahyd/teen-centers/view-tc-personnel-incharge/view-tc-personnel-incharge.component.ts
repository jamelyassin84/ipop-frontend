import { Component, Input, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'ViewPersonnelIncharge',
	templateUrl: './view-tc-personnel-incharge.component.html',
	styleUrls: ['./view-tc-personnel-incharge.component.scss'],
})
export class ViewTcPersonnelInchargeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
	@Input() teen_center_id: number = 0
	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
