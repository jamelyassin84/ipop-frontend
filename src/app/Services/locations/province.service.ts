import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BarangayType } from 'src/app/Types/locations/Barangay.types'
import { MunicipalityType } from 'src/app/Types/locations/Municipality.types'
import { environment } from 'src/environments/environment'
import { BaseService } from '../base.service'

@Injectable({
	providedIn: 'root',
})
export class LocationService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, '', '')
	}

	municipalities(): any {
		return this.http.get<MunicipalityType>(`${environment.api}location/municipalities?province_code=0630`)
	}
	barangays(municipality_code: String): any {
		return this.http.get<BarangayType>(
			`${environment.api}location/barangays?municipality_code=${municipality_code}`
		)
	}
}
