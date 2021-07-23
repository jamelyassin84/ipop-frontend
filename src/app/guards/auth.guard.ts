import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { UserService } from '../Services/Independent/user.service'

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private user: UserService) {}

	canActivate(): boolean {
		if (this.user.role() !== 'Super Admin') {
			this.router.navigate(['/unauthorized'])
			return false
		}
		return true
	}
}
