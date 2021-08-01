import { Component, Input, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'
import { TeenCenterDataService } from 'src/app/Services/home/ahyd/teen-center/teen-center-data.service'

@Component({
	selector: 'app-edit-tc-services',
	templateUrl: './edit-tc-services.component.html',
	styleUrls: ['./edit-tc-services.component.scss'],
})
export class EditTcServicesComponent implements OnInit {
	constructor(private service: TeenCenterDataService) {}
	@Input() id: number = 0
	ngOnInit(): void {}
	data: any = {}
	isLoading = false
	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.update(this.id, this.data).subscribe(() => {
					HasApprovals('Updated')
					this.isLoading = false
				})
			}
		)
	}
}
