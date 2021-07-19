import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BaseService } from 'src/app/Services/base.service'

@Injectable({
	providedIn: 'root',
})
export class KnowledgeOnFpService extends BaseService {
	constructor(private _http: HttpClient) {
		super(_http, 'pmc-kfp', '')
	}
}
