import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { IvyCarouselModule } from 'angular-responsive-carousel'

import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { NavComponent } from './components/nav/nav.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { PopulationComponent } from './home/population/population.component'
import { MandateComponent } from './home/about/mandate/mandate.component'
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
import { CpdbRecordsComponent } from './records/cpdb-records/cpdb-records.component'
import { DeathRecordsComponent } from './records/death-records/death-records.component'
import { BirthRecordsComponent } from './records/birth-records/birth-records.component'
import { InMigrationRecordsComponent } from './records/in-migration-records/in-migration-records.component'
import { OutMigrationRecordsComponent } from './records/out-migration-records/out-migration-records.component'
import { RecordUploadComponent } from './records/record-upload/record-upload.component'
import { ViewAdminsComponent } from './admin/view-admins/view-admins.component'
import { AddAdminComponent } from './admin/add-admin/add-admin.component'
import { LogsComponent } from './logs/logs.component'
import { CpdbFormComponent } from './forms/cpdb-form/cpdb-form.component'
import { DeathFormComponent } from './forms/death-form/death-form.component'
import { BirthFormComponent } from './forms/birth-form/birth-form.component'
import { InMigrationFormComponent } from './forms/in-migration-form/in-migration-form.component'
import { OutMigrationFormComponent } from './forms/out-migration-form/out-migration-form.component'
import { MarriagesFormComponent } from './forms/marriages-form/marriages-form.component'
import { RecordIndexComponent } from './records/record-index/record-index.component'
import { AdminIndexComponent } from './admin/admin-index/admin-index.component'
import { MarriageRecordsComponent } from './records/marriage-records/marriage-records.component'
import { AritclesAndSlidersComponent } from './home/aritcles-and-sliders/aritcles-and-sliders.component'
import { OrganizationalChartComponent } from './home/about/organizational-chart/organizational-chart.component'
import { FootersComponent } from './components/shared/footers/footers.component'

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		NavComponent,
		SidebarComponent,
		HomePageComponent,
		PopulationComponent,
		MandateComponent,
		VmgComponent,
		CoreValuesComponent,
		PersonnelDirectoryComponent,
		AwardsComponent,
		ProgramsComponent,
		ServicesComponent,
		BirthDemographicComponent,
		DeathDemographicComponent,
		MigrationsDemographicComponent,
		MarriageDemographicComponent,
		PmocComponent,
		MpcFdcComponent,
		TeenCentersComponent,
		IssuesAndConcernsComponent,
		OthersComponent,
		CpdbRecordsComponent,
		DeathRecordsComponent,
		BirthRecordsComponent,
		InMigrationRecordsComponent,
		OutMigrationRecordsComponent,
		RecordUploadComponent,
		ViewAdminsComponent,
		AddAdminComponent,
		LogsComponent,
		CpdbFormComponent,
		DeathFormComponent,
		BirthFormComponent,
		InMigrationFormComponent,
		OutMigrationFormComponent,
		MarriagesFormComponent,
		RecordIndexComponent,
		AdminIndexComponent,
		MarriageRecordsComponent,
		AritclesAndSlidersComponent,
		OrganizationalChartComponent,
		FootersComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, IvyCarouselModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
