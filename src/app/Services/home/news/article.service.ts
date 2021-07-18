import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { BaseService } from '../../base.service'

@Injectable({
	providedIn: 'root',
})
export class ArticleService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, 'articles', '')
	}

	today() {
		const url = `${environment.api}articles/today`
		return this.http.get<any>(url)
	}

	week() {
		const url = `${environment.api}articles/week`
		return this.http.get<any>(url)
	}

	month() {
		const url = `${environment.api}articles/month`
		return this.http.get<any>(url)
	}
}
