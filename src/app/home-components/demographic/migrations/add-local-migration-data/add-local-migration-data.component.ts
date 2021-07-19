import { LocalMigrationDataService } from './../../../../Services/home/demographic/migrations/local-migration-data.service'
import { Component, Input, OnInit } from '@angular/core'
import { Fire, Updated } from 'src/app/components/Alert'

@Component({
	selector: 'AddLocalMigrationData',
	templateUrl: './add-local-migration-data.component.html',
	styleUrls: ['./add-local-migration-data.component.scss'],
})
export class AddLocalMigrationDataComponent implements OnInit {
	constructor(private service: LocalMigrationDataService) {}
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
