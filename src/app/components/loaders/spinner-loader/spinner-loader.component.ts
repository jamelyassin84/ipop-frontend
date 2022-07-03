import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'Spinner',
	templateUrl: './spinner-loader.component.html',
})
export class SpinnerLoaderComponent implements OnInit {
	constructor(
		private component: ReloadService,
		private _cdr: ChangeDetectorRef
	) {
		this.component.isLoading().subscribe((value: boolean) => {
			if (value === true) {
				this.isLoading = value
				return
			}
			setTimeout(() => {
				this.isLoading = value
			}, 600)

			this._cdr.detectChanges()
		})
	}

	isLoading: boolean = true

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this._cdr.detach()
	}
}
