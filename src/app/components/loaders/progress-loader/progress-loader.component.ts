import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'ProgressLoader',
	templateUrl: './progress-loader.component.html',
})
export class ProgressLoaderComponent implements OnInit {
	constructor(private component: ReloadService) {
		this.component.isLoading().subscribe((value: boolean) => {
			if (value === true) {
				this.isLoading = value
				return
			}
			setTimeout(() => {
				this.isLoading = value
			}, 700)
		})
	}

	isLoading: boolean = true
	ngOnInit(): void {}
}
