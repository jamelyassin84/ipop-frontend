import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from '../../base.service'

@Injectable({
	providedIn: 'root',
})
export class SliderService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, 'sliders', '')
	}
}
