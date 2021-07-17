import { Injectable } from '@angular/core'
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http'
import { Observable, Subject, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators'
import { Alert } from '../components/Alert'

@Injectable()
export class MainInterceptor implements HttpInterceptor {
	constructor() {}

	private reload = new Subject()

	reloadListener() {
		return this.reload.asObservable()
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.method == 'GET') {
		}
		if (request.method == 'POST') {
			this.reload.next()
		}
		if (request.method == 'PATCH') {
			this.reload.next()
		}
		if (request.method == 'DELETE') {
			this.reload.next()
		}
		console.log(request)
		return next.handle(request).pipe(retry(0), catchError(this.errorMessage))
	}

	errorMessage(response: HttpErrorResponse) {
		console.log(response)
		if (response.status == 404) {
			Alert('HTTP Error', `The requested URL was ${response.statusText}`, 'error')
		}
		if (response.status == 401) {
			Alert('HTTP Error', `You are accunt was not authenticated`, 'error')
		}
		if (response.status == 500) {
			Alert('HTTP Error', `Internal Server Error Contact Developers`, 'error')
		}
		return throwError(response)
	}
}
