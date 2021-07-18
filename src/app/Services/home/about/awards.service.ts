import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '../../base.service'

@Injectable({
	providedIn: 'root',
})
export class AwardsService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, 'awards', '')
	}
}
