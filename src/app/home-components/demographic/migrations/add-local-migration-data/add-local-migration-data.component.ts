import { LocalMigrationDataService } from './../../../../Services/home/demographic/migrations/local-migration-data.service'
import { Component, Input, OnInit } from '@angular/core'
import { Fire, HasApprovals } from 'src/app/modules/extras/Alert'

@Component({
	selector: 'AddLocalMigrationData',
	templateUrl: './add-local-migration-data.component.html',
	styleUrls: ['./add-local-migration-data.component.scss'],
})
export class AddLocalMigrationDataComponent implements OnInit {
	constructor(private service: LocalMigrationDataService) {}
	@Input() data: any = {}
	ngOnInit(): void {}

	isLoading: boolean = false
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
