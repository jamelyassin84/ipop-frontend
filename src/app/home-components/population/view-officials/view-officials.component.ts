import { Component, OnInit } from '@angular/core'
import { Deleted, Fire } from 'src/app/modules/extras/Alert'
import { BarangayService } from 'src/app/Services/home/officials/barangay.service'
import { MunicipalService } from 'src/app/Services/home/officials/municipal.service'
import { ProvincialService } from 'src/app/Services/home/officials/provincial.service'
import { SpMemberService } from 'src/app/Services/home/officials/sp-member.service'
import { UserService } from 'src/app/Services/Independent/user.service'
import { LocationService } from 'src/app/Services/locations/province.service'
import { ReloadService } from 'src/app/Services/reload.service'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { BarangayOfficialType } from 'src/app/Types/officials/BarangayOfficials.types'

@Component({
	selector: 'ViewOfficials',
	templateUrl: './view-officials.component.html',
	styleUrls: ['./view-officials.component.scss'],
})
export class ViewOfficialsComponent implements OnInit {
	constructor(
		private provincialOfficial: ProvincialService,
		private SPMember: SpMemberService,
		private municipalOfficial: MunicipalService,
		private barangayOfficial: BarangayService,
		private location: LocationService,
		private component: ReloadService,
		private user: UserService
	) {
		this.component.shouldReload().subscribe(() => {
			this.fetch()
		})
	}
	isUser = !this.user.isSuperAdmin()

	types = [
		'Provincial Official',
		'Sanguniang Panlalawigan Member',
		'Municipal Official',
		'Barangay Official',
	]
	type: string = 'Provincial Official'

	reset() {
		this.data = {
			municipality: null,
			barangay: null,
		}
	}

	fetch() {
		if (this.type === 'Provincial Official') {
			this.viewProvincialOfficial()
		}
		if (this.type === 'Sanguniang Panlalawigan Member') {
			this.viewSPMember()
		}
		if (this.type === 'Municipal Official') {
			this.viewMunicipalOfficial()
		}
		if (this.type === 'Barangay Official') {
			this.viewBarangayOfficial()
		}
		this.currentOfficial = this.type
	}

	data: any = {}
	officials: any[] = []
	viewProvincialOfficial() {
		this.provincialOfficial.index().subscribe((officials: any) => {
			this.officials = officials.data
		})
	}

	viewSPMember() {
		this.SPMember.index().subscribe((officials: any) => {
			this.officials = officials.data
		})
	}

	viewMunicipalOfficial() {
		this.municipalOfficial
			.index(`municipality=${this.data.municipality}`)
			.subscribe((officials: any) => {
				this.officials = officials
			})
	}

	viewBarangayOfficial() {
		this.barangayOfficial
			.index(`barangay=${this.data.barangay}`)
			.subscribe((officials: any) => {
				this.officials = officials
			})
	}

	currentOfficial: any = {}
	removeOfficial(id: number) {
		Fire(
			'Remove Official?',
			'Are you sure you want to remove this data?',
			'info',
			() => {
				if (this.type === 'Provincial Official') {
					this.removeProvincialOfficial(id)
				}
				if (this.type === 'Sanguniang Panlalawigan Member') {
					this.removeSPMember(id)
				}
				if (this.type === 'Municipal Official') {
					this.removeMunicipalOfficial(id)
				}
				if (this.type === 'Barangay Official') {
					this.removeBarangayOfficial(id)
				}
			}
		)
	}

	removeProvincialOfficial(id: number) {
		this.provincialOfficial.destroy(id).subscribe(() => {
			Deleted()
		})
	}

	removeSPMember(id: number) {
		this.SPMember.destroy(id).subscribe(() => {
			Deleted()
		})
	}

	removeMunicipalOfficial(id: number) {
		this.municipalOfficial.destroy(id).subscribe(() => {
			Deleted()
		})
	}

	removeBarangayOfficial(id: number) {
		this.barangayOfficial.destroy(id).subscribe(() => {
			Deleted()
		})
	}

	ngOnInit(): void {
		this.getMuncipalities()
	}

	municipalities: MunicipalityType[] = []
	getMuncipalities() {
		this.location.municipalities().subscribe((data: any) => {
			this.municipalities = data
		})
	}

	barangays: BarangayOfficialType[] = []
	getBarangays(event: any) {
		this.data.municipality =
			event.target.options[event.target.options.selectedIndex].text
		this.location.barangays(event.target.value).subscribe((data: any) => {
			this.barangays = data
		})
	}
}
