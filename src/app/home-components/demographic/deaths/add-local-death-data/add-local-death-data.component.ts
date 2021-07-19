import { LocalDeathDataService } from './../../../../Services/home/demographic/deaths/local-death-data.service'
import { Component, Input, OnInit } from '@angular/core'
import { Fire, Updated } from 'src/app/components/Alert'

@Component({
	selector: 'AddLocalDeathData',
	templateUrl: './add-local-death-data.component.html',
	styleUrls: ['./add-local-death-data.component.scss'],
})
export class AddLocalDeathDataComponent implements OnInit {
	constructor(private service: LocalDeathDataService) {}

	@Input() data: any = {}
	ngOnInit(): void {}

	save() {
		Fire('Save Changes?', 'Are you sure you want to add this data?', 'info', () => {
			this.service.update(this.data.id, this.data).subscribe(() => {
				Updated()
			})
		})
	}
}
