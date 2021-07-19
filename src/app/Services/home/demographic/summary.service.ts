import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { BaseService } from '../../base.service'

@Injectable({
	providedIn: 'root',
})
export class SummaryService {
	constructor(private http: HttpClient) {}

	births() {
		const url = `${environment.api}birth-statistics/summary`
		return this.http.get<any>(url)
	}

	deaths() {
		const url = `${environment.api}death-statistics/summary`
		return this.http.get<any>(url)
	}

	migrations() {
		const url = `${environment.api}migration-statistics/summary`
		return this.http.get<any>(url)
	}

	marriages() {
		const url = `${environment.api}birth-statistics/summary`
		return this.http.get<any>(url)
	}
}
