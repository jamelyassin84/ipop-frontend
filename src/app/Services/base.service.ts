import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable, Optional } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class BaseService {
	constructor(
		public http: HttpClient,
		@Inject('url') public url: String = '',
		@Inject('params') @Optional() public params: any
	) {}

	headers() {
		const token = localStorage.getItem('token')
		return {
			headers: new HttpHeaders({
				Accept: 'application/json',
				Authorization: 'Bearer ' + token,
			}),
		}
	}

	index() {
		const url = `${environment.api}${this.url}${this.params}`
		return this.http.get<any>(url)
	}

	show(id: Number) {
		const url = `${environment.api}${this.url}/${id}`
		return this.http.get<any>(url)
	}

	create(data: JSON) {
		const url = `${environment.api}${this.url}`
		return this.http.post<any>(url, data, this.headers())
	}

	update(id: Number, data: JSON) {
		const url = `${environment.api}${this.url}/${id}`
		return this.http.patch<any>(url, data, this.headers())
	}

	destroy(id: Number) {
		const url = `${environment.api}${this.url}/${id}`
		return this.http.delete<any>(url, this.headers())
	}
}
