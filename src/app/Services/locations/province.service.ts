import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
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
		const url = `${environment.api}location/municipalities?province_code=0630`
		return this.http.get<any>(url)
	}
	barangays(municipality_code: String) {
		const url = `${environment.api}location/barangays?municipality_code=${municipality_code}`
		return this.http.get<any>(url)
	}
}
