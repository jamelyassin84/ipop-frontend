import { ReloadService } from './../Services/reload.service'
import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { Observable, Subject, throwError } from 'rxjs'
import { retry, catchError, tap } from 'rxjs/operators'
import { Alert } from '../components/Alert'

@Injectable()
export class MainInterceptor implements HttpInterceptor {
	constructor(private component: ReloadService) {}

	intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		return next.handle(request).pipe(
			retry(0),
			tap(() => {
				if (request.method !== 'GET') {
					this.component.willReload()
				}
			}),
			catchError(this.errorMessage)
		)
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
