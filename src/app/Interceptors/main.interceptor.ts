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

	intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
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
		return next.handle(request).pipe(retry(0), catchError(this.errorMessage))
	}

	errorMessage(response: HttpErrorResponse) {
		if (response.status == 404) {
			Alert('HTTP Error', `The requested URL was ${response.statusText}`, 'error')
		}
		if (response.status == 401) {
			Alert('HTTP Error', `You are account was not authenticated`, 'error')
		}
		if (response.status == 500) {
			Alert('HTTP Error', `Internal Server Error Contact Developers`, 'error')
		}
		for (let message in response.error.errors) {
			Alert(`Error!`, JSON.stringify(response.error.errors[message]), 'error')
			break
		}

		return throwError(response)
	}
}
