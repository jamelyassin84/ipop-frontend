import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'ViewPersonnelIncharge',
	templateUrl: './view-tc-personnel-incharge.component.html',
	styleUrls: ['./view-tc-personnel-incharge.component.scss'],
})
export class ViewTcPersonnelInchargeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
