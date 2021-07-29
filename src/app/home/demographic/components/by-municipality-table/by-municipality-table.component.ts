import { LocalMigrationDataService } from './../../../../Services/home/demographic/migrations/local-migration-data.service'
import { MarraigesService } from './../../../../Services/home/demographic/marraiges/marraiges.service'
import { LocalDeathDataService } from './../../../../Services/home/demographic/deaths/local-death-data.service'
import { Component, Input, OnInit } from '@angular/core'
import { Deleted, Fire } from 'src/app/modules/extras/Alert'
import { LocalBirthDataService } from 'src/app/Services/home/demographic/births/local-birth-data.service'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'ByMunicipalityTable',
	templateUrl: './by-municipality-table.component.html',
	styleUrls: ['./by-municipality-table.component.scss'],
})
export class ByMunicipalityTableComponent implements OnInit {
	constructor(
		private user: UserService,
		private birth: LocalBirthDataService,
		private death: LocalDeathDataService,
		private marriage: MarraigesService,
		private migration: LocalMigrationDataService
	) {}

	ngOnInit(): void {}

	@Input() title: any = ''
	@Input() headerClass: any = ''
	@Input() headers: Array<string> = []
	@Input() body: Array<any> = []
	@Input() keys: Array<any> = []
	@Input() type: string = 'Birth'

	isUser = !this.user.isAdmin()

	deleteData(id: number) {
		Fire(
			'Delete data?',
			'Are you sure you want to delete this data?',
			'info',
			() => {
				if (this.type === 'Birth') {
					this.birth.destroy(id).subscribe()
				}
				if (this.type === 'Death') {
					this.death.destroy(id).subscribe()
				}
				if (this.type === 'Marriage') {
					this.marriage.destroy(id).subscribe()
				}
				if (this.type === 'Migration') {
					this.migration.destroy(id).subscribe()
				}
				Deleted()
			}
		)
	}
}
