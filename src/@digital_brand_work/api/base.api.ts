import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Inject, Injectable, Optional} from '@angular/core'
import {environment} from 'environments/environment'
import {Observable} from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class BaseService<T> {
    constructor(
        @Optional() public http: HttpClient,
        @Inject('url') public url: String = '',
    ) {}

    token: string | undefined | unknown = undefined

    headers() {
        const token = localStorage.getItem('access_token')

        const headers: any = {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + token,
        }

        if (token === undefined) {
            delete headers['Authorization']
        }

        return {
            headers: new HttpHeaders(headers),
        }
    }

    paginate(url: string): Observable<T> {
        return this.http.get<T>(url, this.headers())
    }

    get(): Observable<T> {
        const url = `${environment.api}${this.url}`

        return this.http.get<any>(url, this.headers())
    }

    query(queryStringParam: {[key: string]: string}): Observable<T[] | T> {
        const url = `${environment.api}${this.url}?${new URLSearchParams(
            queryStringParam,
        )}`

        return this.http.get<any>(url, this.headers())
    }

    custom(param: string): Observable<T | T> {
        const url = `${environment.api}${this.url}${param}`

        return this.http.get<T>(url, this.headers())
    }

    postCustom(param: string, data: Object): Observable<T> {
        const url = `${environment.api}${this.url}${param}`

        return this.http.post<T>(url, data, this.headers())
    }

    findOne(id: string | number): Observable<T> {
        const url = `${environment.api}${this.url}/${id}`

        return this.http.get<T>(url, this.headers())
    }

    postWithFile(data: Object): Observable<T> {
        const url = `${environment.api}${this.url}`

        let form = new FormData()

        for (let key in data) {
            form.append(key, data[key])
        }

        return this.http.post<T>(url, form, this.headers())
    }

    post(data: Object): Observable<T> {
        const url = `${environment.api}${this.url}`
        return this.http.post<T>(url, data, this.headers())
    }

    put(data: Object): Observable<T> {
        const url = `${environment.api}${this.url}`

        return this.http.put<T>(url, data, this.headers())
    }

    updateWithFileNode(
        id: string | number | false,
        data: FormData | any,
    ): Observable<T> {
        const url = `${environment.api}${this.url}${
            id !== false ? `/${id}` : ''
        }`

        let form = new FormData()

        for (let key in data) {
            form.append(key, data[key])
        }

        return this.http.put<T>(url, form, this.headers())
    }

    updateWithFilePHP(
        id: string | number | false,
        data: FormData | any,
    ): Observable<T> {
        const url = `${environment.api}${this.url}${
            id !== false ? `/${id}` : ''
        }`

        let form = new FormData()

        for (let key in data) {
            form.append(key, data[key])
        }

        form.append('_method', 'PUT')

        return this.http.post<T>(url, form, this.headers())
    }

    update(id: string | number | false, data: Object): Observable<T> {
        const url = `${environment.api}${this.url}${
            id !== false ? `/${id}` : ''
        }`

        return this.http.put<T>(url, data, this.headers())
    }

    remove(id: string | number): Observable<T> {
        const url = `${environment.api}${this.url}/${id}`

        return this.http.delete<T>(url, this.headers())
    }
}
