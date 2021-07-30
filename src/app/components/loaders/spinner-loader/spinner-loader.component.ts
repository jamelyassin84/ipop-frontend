import { Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'Spinner',
	templateUrl: './spinner-loader.component.html',
	styleUrls: ['./spinner-loader.component.scss'],
})
export class SpinnerLoaderComponent implements OnInit {
	constructor(private component: ReloadService) {
		this.component.isLoading().subscribe((value: boolean) => {
			setTimeout(() => {
				this.isLoading = value
			}, 600)
		})
	}

	isLoading: boolean = true
	ngOnInit(): void {}
}
