import { Component, OnInit } from '@angular/core'
import { Created, Fire, HasApprovals } from 'src/app/components/Alert'
import { QuickLinksService } from 'src/app/Services/home/news/quick-links.service'

@Component({
	selector: 'AddQuickLinks',
	templateUrl: './add-quick-links.component.html',
	styleUrls: ['./add-quick-links.component.scss'],
})
export class AddQuickLinksComponent implements OnInit {
	constructor(private service: QuickLinksService) {}

	ngOnInit(): void {}

	data = {
		title: '',
		url: '',
	}

	isLoading: boolean = false
	saveQuickLink() {
		Fire(
			'Save Changes?',
			'Are you sure you want to add this data?',
			'info',
			() => {
				this.isLoading = true
				this.service.create(this.data).subscribe(() => {
					HasApprovals('Created')
					this.isLoading = false
				})
			}
		)
	}
}
