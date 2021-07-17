import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class BarangayService {
	constructor(private http: HttpClient) {}

	getBarangays(municipality_code: String) {
		const url = environment.api + 'barangays?municipality_code=' + municipality_code
		return this.http.get<any>(url)
	}
}
