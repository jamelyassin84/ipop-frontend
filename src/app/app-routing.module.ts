import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { AritclesAndSlidersComponent } from './home/aritcles-and-sliders/aritcles-and-sliders.component'
import { PopulationComponent } from './home/population/population.component'
import { MandateComponent } from './home/about/mandate/mandate.component'
import { OrganizationalChartComponent } from './home/about/organizational-chart/organizational-chart.component'
import { VmgComponent } from './home/about/vmg/vmg.component'
import { CoreValuesComponent } from './home/about/core-values/core-values.component'
import { PersonnelDirectoryComponent } from './home/about/personnel-directory/personnel-directory.component'
import { AwardsComponent } from './home/about/awards/awards.component'
import { ProgramsComponent } from './home/programs/programs.component'
import { ServicesComponent } from './home/services/services.component'
import { BirthDemographicComponent } from './home/demographic/birth-demographic/birth-demographic.component'
import { DeathDemographicComponent } from './home/demographic/death-demographic/death-demographic.component'
import { MigrationsDemographicComponent } from './home/demographic/migrations-demographic/migrations-demographic.component'
import { MarriageDemographicComponent } from './home/demographic/marriage-demographic/marriage-demographic.component'
import { PmocComponent } from './home/rpfp/pmoc/pmoc.component'
import { MpcFdcComponent } from './home/rpfp/mpc-fdc/mpc-fdc.component'
import { TeenCentersComponent } from './home/ahyd/teen-centers/teen-centers.component'
import { IssuesAndConcernsComponent } from './home/ahyd/issues-and-concerns/issues-and-concerns.component'
import { OthersComponent } from './home/others/others.component'
import { RecordUploadComponent } from './modules/records/pages/record-upload/record-upload.component'
import { ViewAdminsComponent } from './modules/admin/pages/view-admins/view-admins.component'
import { AddAdminComponent } from './modules/admin/pages/add-admin/add-admin.component'
import { LogsComponent } from './modules/logs/logs.component'
import { RecordIndexComponent } from './modules/records/pages/record-index/record-index.component'
import { AdminIndexComponent } from './modules/admin/pages/admin-index/admin-index.component'
import { ApprovalsComponent } from './modules/approvals/content/approve-requests/approvals/approvals.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { NoInternetComponent } from './pages/no-internet/no-internet.component'
import { UploadedRecordsComponent } from './modules/records/pages/uploaded-records/uploaded-records.component'
import { ForApprovalRecordsComponent } from './modules/records/pages/for-approval-records/for-approval-records.component'
import { UpdateAccountComponent } from './modules/admin/pages/update-account/update-account.component'
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component'
import { AuthGuard } from './guards/auth.guard'
import { BulkDataGuardGuard } from './guards/bulk-data-guard.guard'

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'admin',
		component: LoginComponent,
		data: { animation: 'fade' },
	},
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent,
				data: { animation: 'fade' },

				children: [
					{
						path: 'index',
						component: HomePageComponent,
						children: [
							{
								path: 'news',
								component: AritclesAndSlidersComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'population',
								component: PopulationComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'about',
								children: [
									{
										path: 'ppo-mandate',
										component: MandateComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'mission-values-and-goals',
										component: VmgComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'core-values',
										component: CoreValuesComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'organizational-structure',
										component: OrganizationalChartComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'personnel-directory',
										component: PersonnelDirectoryComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'awards',
										component: AwardsComponent,
										data: { animation: 'fade' },
									},
								],
							},
							{
								path: 'programs/:id',
								component: ProgramsComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'services/:id',
								component: ServicesComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'demographic',
								children: [
									{
										path: 'deaths',
										component: DeathDemographicComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'births',
										component: BirthDemographicComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'migrations',
										component:
											MigrationsDemographicComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'marriages',
										component: MarriageDemographicComponent,
										data: { animation: 'fade' },
									},
								],
							},
							{
								path: 'rpfp',
								children: [
									{
										path: 'pmoc',
										component: PmocComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'mpcfdc',
										component: MpcFdcComponent,
										data: { animation: 'fade' },
									},
								],
							},
							{
								path: 'ahyd',
								children: [
									{
										path: 'teen-centers',
										component: TeenCentersComponent,
										data: { animation: 'fade' },
									},
									{
										path: 'issues-and-concerns',
										component: IssuesAndConcernsComponent,
										data: { animation: 'fade' },
									},
								],
							},
							{
								path: 'others',
								component: OthersComponent,
								data: { animation: 'fade' },
							},
						],
					},
					{
						path: 'bulk-records',
						component: RecordIndexComponent,
						canActivate: [BulkDataGuardGuard],
						data: { animation: 'fade' },
						children: [
							{
								path: '',
								component: RecordUploadComponent,
								canActivate: [BulkDataGuardGuard],
								data: { animation: 'fade' },
							},
							{
								path: 'upload',
								component: RecordUploadComponent,
								canActivate: [BulkDataGuardGuard],
								data: { animation: 'fade' },
							},
							{
								path: 'cloud-files',
								component: UploadedRecordsComponent,
								canActivate: [BulkDataGuardGuard],
								data: { animation: 'fade' },
							},
							{
								path: 'for-approvals',
								component: ForApprovalRecordsComponent,
								canActivate: [BulkDataGuardGuard],
								data: { animation: 'fade' },
							},
						],
					},
					{
						path: 'admins',
						component: AdminIndexComponent,
						canActivate: [AuthGuard],
						data: { animation: 'fade' },
						children: [
							{
								path: '',
								component: ViewAdminsComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'view',
								component: ViewAdminsComponent,
								data: { animation: 'fade' },
							},
							{
								path: 'add',
								component: AddAdminComponent,
								data: { animation: 'fade' },
							},
						],
					},
					{
						path: 'approvals',
						component: ApprovalsComponent,
						canActivate: [AuthGuard],
						data: { animation: 'fade' },
					},
					{
						path: 'logs',
						component: LogsComponent,
						canActivate: [AuthGuard],
						data: { animation: 'fade' },
					},
					{
						path: 'account/:id',
						component: UpdateAccountComponent,
						data: { animation: 'fade' },
					},
				],
			},
		],
	},
	{ path: 'no-internet', component: NoInternetComponent },
	{ path: 'unauthorized', component: UnauthorizedComponent },
	{ path: '**', component: NotFoundComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
