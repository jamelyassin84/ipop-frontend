import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {SharedModule} from 'src/app/shared/shared.module'
import {LoginComponent} from './login.component'

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
            },
        ]),
        SharedModule,
    ],
})
export class LoginModule {}
