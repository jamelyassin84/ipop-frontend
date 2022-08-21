import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'
import {BaseService} from '../base.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService {
    cache = ''
    constructor(private _http: HttpClient) {
        super(_http, 'auth', '')
    }

    register(data: FormData) {
        const url = `${environment.api}${this.url}/register`
        if (this.cache === url) {
            return
        }
        this.cache = url
        return this.http.post<any>(url, data, this.headers())
    }

    login(data: Partial<{username: string; password: string}>) {
        const url = `${environment.api}${this.url}/login`

        if (this.cache === url) {
            return
        }

        this.cache = url

        return this.http.post<any>(url, data, {headers: environment.password})
    }
}
