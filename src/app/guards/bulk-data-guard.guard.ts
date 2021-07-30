import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { UserService } from '../Services/Independent/user.service'

@Injectable({
	providedIn: 'root',
})
export class BulkDataGuardGuard implements CanActivate {
	constructor(private user: UserService, private router: Router) {}

	canActivate(): boolean {
		if (!this.user.isAdmin()) {
			this.router.navigate(['/unauthorized'])
			return false
		}
		return true
	}
}
