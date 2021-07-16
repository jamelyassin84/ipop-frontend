import { Component, OnInit } from '@angular/core'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { BarangayOfficialType } from 'src/app/Types/officials/BarangayOfficials.types'
@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.component.html',
	styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
	isSubmitting: Boolean = false
	municipalities: MunicipalityType[] = []
	barangays: BarangayOfficialType[] = []
	barangayIsLoading: Boolean = false
	isLoading: Boolean = false
	image: any
	invalidData: any = {}
	data: any = {}
	randomImages = [
		'/assets/avatars/face-7.jpg',
		'/assets/avatars/face-7.jpg',
		'/assets/avatars/face-7.jpg',
		'/assets/avatars/face-7.jpg',
	]

	constructor() {}

	ngOnInit(): void {
		this.setRandomImage()
	}

	setRandomImage() {
		this.image = this.randomImages[Math.floor(Math.random() * this.randomImages.length)]
	}

	register() {}
}
