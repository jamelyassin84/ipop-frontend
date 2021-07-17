import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root',
})
export class MunicipalService {
	constructor(private http: HttpClient) {}

	getMunicipalities(): any {
		const url = environment.api + 'municipalities?province_code=0630'
		return this.http.get<any>(url)
	}
}
