import { OrganizationalChartService } from './../../../Services/home/about/organizational-chart.service'
import { Component, OnInit } from '@angular/core'
import { Alert, HasApprovals } from 'src/app/components/Alert'
import { ReloadService } from 'src/app/Services/reload.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-organizational-chart',
	templateUrl: './organizational-chart.component.html',
	styleUrls: ['./organizational-chart.component.scss'],
})
export class OrganizationalChartComponent implements OnInit {
	constructor(private service: OrganizationalChartService, private component: ReloadService) {
		this.subscriptions.add(
			this.component.shouldReload().subscribe(() => {
				this.ngOnInit()
			})
		)
	}

	private subscriptions = new Subscription()

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe()
	}

	ngOnInit(): void {
		this.service.index().subscribe((data) => {
			this.img = data.photo.uri
		})
	}

	img = null

	triggerInputTypeFile() {
		document.getElementById('input-type-file')?.click()
	}

	readUrl(event: any) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader()
			reader.readAsDataURL(event.target.files[0])
			reader.onload = (event) => {
				this.storeOrganizationalStructure((<FileReader>event.target).result)
			}
		}
	}

	storeOrganizationalStructure(file: any) {
		let data: any = {}
		data['photo'] = file
		this.service.create(data).subscribe((data) => {
			HasApprovals('Created')
		})
	}
}
