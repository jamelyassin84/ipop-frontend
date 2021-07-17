import { BarangayService } from './../../Services/home/officials/barangay.service'
import { MunicipalService } from './../../Services/home/officials/municipal.service'
import { Component, OnInit } from '@angular/core'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { BarangayOfficialType } from 'src/app/Types/officials/BarangayOfficials.types'
import { LocationService } from 'src/app/Services/locations/province.service'
@Component({
	selector: 'app-add-admin',
	templateUrl: './add-admin.component.html',
	styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
	randomImages = ['/assets/avatars/face-7.jpg']
	isSubmitting: Boolean = false
	municipalities: MunicipalityType[] = []
	barangays: BarangayOfficialType[] = []
	image: any
	invalidData: any = {}
	data: any = {}

	constructor(private location: LocationService) {}

	ngOnInit(): void {
		this.setRandomImage()
		this.getMuncipalities()
	}

	getMuncipalities() {
		this.location.municipalities().subscribe((data: any) => {
			this.municipalities = data
		})
	}

	getBarangays(event: any) {
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text
		this.location.barangays(event.target.value).subscribe((data: any) => {
			this.barangays = data
		})
	}

	setRandomImage() {
		this.image = this.randomImages[Math.floor(Math.random() * this.randomImages.length)]
	}

	register() {}
}
