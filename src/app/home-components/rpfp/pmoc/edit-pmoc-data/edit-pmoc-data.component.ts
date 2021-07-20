import { Component, Input, OnInit } from '@angular/core'
import { Created, Fire } from 'src/app/components/Alert'
import { PmocDataService } from 'src/app/Services/home/rpfp/pmoc/pmoc-data.service'

@Component({
	selector: 'EditPMOCData',
	templateUrl: './edit-pmoc-data.component.html',
	styleUrls: ['./edit-pmoc-data.component.scss'],
})
export class EditPmocDataComponent implements OnInit {
	constructor(private service: PmocDataService) {}

	ngOnInit(): void {}
	@Input() data: any = {}
	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.update(this.data.id, this.data).subscribe(() => {
				Created()
			})
		})
	}
}
