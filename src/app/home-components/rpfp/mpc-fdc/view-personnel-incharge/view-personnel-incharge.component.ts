import { Component, OnInit } from '@angular/core'
import { Fire } from 'src/app/components/Alert'

@Component({
	selector: 'ViewMPCFDCPersonnelIncharge',
	templateUrl: './view-personnel-incharge.component.html',
	styleUrls: ['./view-personnel-incharge.component.scss'],
})
export class ViewPersonnelInchargeComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	remove() {
		Fire('Remove Data?', 'Are you sure you want to remove this data?', 'info', () => {})
	}
}
