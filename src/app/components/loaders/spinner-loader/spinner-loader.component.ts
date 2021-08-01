import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'Spinner',
	templateUrl: './spinner-loader.component.html',
})
export class SpinnerLoaderComponent implements OnInit {
	constructor(private component: ReloadService) {
		this.component.isLoading().subscribe((value: boolean) => {
			if (value === true) {
				this.isLoading = value
				return
			}
			setTimeout(() => {
				this.isLoading = value
			}, 600)
		})
	}

	isLoading: boolean = true
	ngOnInit(): void {}
}
