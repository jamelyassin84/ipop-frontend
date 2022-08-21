import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {Welcome} from 'src/app/modules/extras/Alert'
import {stringify} from 'src/app/constants/Shortcuts'
import {AuthService} from 'src/app/Services/Independent/auth.service'
import {UserType} from 'src/app/Types/User.types'
import {
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    Validators,
} from '@angular/forms'
import {tap} from 'rxjs/operators'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [...dbwAnimations],
})
export class LoginComponent implements OnInit {
    constructor(
        private router: Router,
        private auth: AuthService,
        private _formBuilder: NonNullableFormBuilder,
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem('token') != undefined) {
            this.router.navigate(['/home/index/news'])
        }
    }

    signInForm: FormGroup<LoginPayload> = this._formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })

    isLoading = false

    login() {
        if (!this.signInForm.valid) {
            return
        }

        this.signInForm.disable()

        this.auth.cache = ''

        this.auth
            .login(this.signInForm.value)
            ?.pipe(
                tap((data: Login) => {
                    localStorage.setItem('token', data.token)

                    const user: UserType = data.user

                    localStorage.setItem('role', user.roles[0].name)

                    localStorage.setItem(
                        'avatar',
                        user.profile_picture?.uri || 'null',
                    )

                    localStorage.setItem('user', stringify(user))

                    Welcome(user.fullname)

                    this.router.navigate(['/home/index/news'])
                }),
            )
            ?.subscribe()
            .add(() => this.signInForm.enable())
    }
}
export interface LoginPayload {
    username: FormControl<string>
    password: FormControl<string>
}

interface Login {
    token: string
    user: UserType
}
