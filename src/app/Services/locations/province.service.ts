import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class ProvinceService {
	constructor(private http: HttpClient) {}

	getMunicipalities(): any {
		const url = `${environment.api}location/municipalities?province_code=0630`
		return this.http.get<any>(url)
	}
	getBarangays(municipality_code: String) {
		const url = `${environment.api}location/barangays?municipality_code=${municipality_code}`
		return this.http.get<any>(url)
	}
}
