import { LocalBirthDataService } from './../../../../Services/home/demographic/births/local-birth-data.service'
import { Component, Input, OnInit } from '@angular/core'
import { Fire, Updated } from 'src/app/components/Alert'

@Component({
	selector: 'CustomizeBirthData',
	templateUrl: './customize-birth-data.component.html',
	styleUrls: ['./customize-birth-data.component.scss'],
})
export class CustomizeBirthDataComponent implements OnInit {
	constructor(private service: LocalBirthDataService) {}

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
