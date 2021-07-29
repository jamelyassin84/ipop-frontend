import { Component, Input, OnInit } from '@angular/core'
import { Deleted, Fire } from 'src/app/modules/extras/Alert'
import { UserService } from 'src/app/Services/Independent/user.service'

@Component({
	selector: 'ByMunicipalityTable',
	templateUrl: './by-municipality-table.component.html',
	styleUrls: ['./by-municipality-table.component.scss'],
})
export class ByMunicipalityTableComponent implements OnInit {
	constructor(private user: UserService) {}

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
				alert(id)
				Deleted()
			}
		)
	}
}
