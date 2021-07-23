import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '../base.service'

@Injectable({
	providedIn: 'root',
})
export class UserService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, 'users', '')
	}

	user: any = localStorage.getItem('user')

	name() {
		return JSON.parse(this.user)?.fullname || ''
	}

	id() {
		return JSON.parse(this.user)?.id || ''
	}

	role() {
		return localStorage.getItem('role') || ''
	}
}
