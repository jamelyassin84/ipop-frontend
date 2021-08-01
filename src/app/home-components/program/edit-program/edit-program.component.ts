import { ProgramAreasService } from './../../../Services/home/program-areas/program-areas.service'
import { Component, OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'app-edit-program',
	templateUrl: './edit-program.component.html',
	styles: [],
})
export class EditProgramComponent implements OnInit {
	constructor(private service: ProgramAreasService) {}

	ngOnInit(): void {}

	@Input() data: any = {}

	isLoading = false

	save() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.update(this.data.id, this.data).subscribe(() => {
					HasApprovals('Updated')
					this.isLoading = false
				})
			}
		)
	}
}
