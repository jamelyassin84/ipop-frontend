// Buil-in Modules
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

// Third Party Modules
import { IvyCarouselModule } from 'angular-responsive-carousel'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ChartsModule } from 'ng2-charts'
import { GoogleChartsModule } from 'angular-google-charts'
import { TextareaAutosizeModule } from 'ngx-textarea-autosize'
import { NgxDropzoneModule } from 'ngx-dropzone'

// Custom Modules
import { AdminModule } from './modules/admin/admin.module'
import { ApprovalModule } from './modules/approvals/approval.module'
import { LogsModule } from './modules/logs/logs.module'
import { RecordsModule } from './modules/records/records.module'
import { ExtrasModule } from './modules/extras/extras.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Shared Component
import { ViewAdminsComponent } from './modules/admin/pages/view-admins/view-admins.component'

// App Components
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { NavComponent } from './components/nav/nav.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { NoInternetComponent } from './pages/no-internet/no-internet.component'
import { NotFoundComponent } from './pages/not-found/not-found.component'
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component'

// Home Components
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
import { AritclesAndSlidersComponent } from './home/aritcles-and-sliders/aritcles-and-sliders.component'
import { OrganizationalChartComponent } from './home/about/organizational-chart/organizational-chart.component'
import { FootersComponent } from './components/footers/footers.component'
import { EditSliderImageComponent } from './home-components/articles-and-sliders/edit-slider-image/edit-slider-image.component'
import { AddArticleComponent } from './home-components/articles-and-sliders/add-article/add-article.component'
import { AddQuickLinksComponent } from './home-components/articles-and-sliders/add-quick-links/add-quick-links.component'
import { TopPopulatedComponent } from './home-components/population/top-populated/top-populated.component'
import { AddPopulationProfileComponent } from './home-components/population/add-population-profile/add-population-profile.component'
import { CustomizePyramidComponent } from './home-components/population/customize-pyramid/customize-pyramid.component'
import { AddOfficialsComponent } from './home-components/population/add-officials/add-officials.component'
import { ViewOfficialsComponent } from './home-components/population/view-officials/view-officials.component'
import { CustomizeTechnicalNotesComponent } from './home-components/population/customize-technical-notes/customize-technical-notes.component'
import { TechnicalNotesComponent } from './home-components/technical-notes/technical-notes.component'
import { AddPersonnelDirectoryComponent } from './home-components/about/add-personnel-directory/add-personnel-directory.component'
import { AddAwardsComponent } from './home-components/about/add-awards/add-awards.component'
import { AddProgramComponent } from './home-components/program/add-program/add-program.component'
import { AddServicesComponent } from './home-components/services/add-services/add-services.component'
import { AddBirthDataComponent } from './home-components/demographic/births/add-birth-data/add-birth-data.component'
import { MonthChartDataComponent } from './home-components/demographic/births/month-chart-data/month-chart-data.component'
import { CustomizeBirthDataComponent } from './home-components/demographic/births/customize-birth-data/customize-birth-data.component'
import { CustomizeTeenageComponent } from './home-components/demographic/births/customize-teenage/customize-teenage.component'
import { CustomizeIllegitimateComponent } from './home-components/demographic/births/customize-illegitimate/customize-illegitimate.component'
import { AddDeathDataComponent } from './home-components/demographic/deaths/add-death-data/add-death-data.component'
import { AddLocalDeathDataComponent } from './home-components/demographic/deaths/add-local-death-data/add-local-death-data.component'
import { AddCrudeDeathRateComponent } from './home-components/demographic/deaths/add-crude-death-rate/add-crude-death-rate.component'
import { AddMigrationDataComponent } from './home-components/demographic/migrations/add-migration-data/add-migration-data.component'
import { AddLocalMigrationDataComponent } from './home-components/demographic/migrations/add-local-migration-data/add-local-migration-data.component'
import { CustomizeMigrationChartComponent } from './home-components/demographic/migrations/customize-migration-chart/customize-migration-chart.component'
import { AddPmocDataComponent } from './home-components/rpfp/pmoc/add-pmoc-data/add-pmoc-data.component'
import { EditPmocDataComponent } from './home-components/rpfp/pmoc/edit-pmoc-data/edit-pmoc-data.component'
import { CustomizeCoupleChartComponent } from './home-components/rpfp/pmoc/customize-couple-chart/customize-couple-chart.component'
import { CustomizeByAgeGroupChartComponent } from './home-components/rpfp/pmoc/customize-by-age-group-chart/customize-by-age-group-chart.component'
import { CustomizeByAgeEmploymentStatusChartComponent } from './home-components/rpfp/pmoc/customize-by-age-employment-status-chart/customize-by-age-employment-status-chart.component'
import { CustomizeByKnowledgeOnFpChartComponent } from './home-components/rpfp/pmoc/customize-by-knowledge-on-fp-chart/customize-by-knowledge-on-fp-chart.component'
import { CustomizeByCivilStatusChartComponent } from './home-components/rpfp/pmoc/customize-by-civil-status-chart/customize-by-civil-status-chart.component'
import { CustomizeByMonthlyIncomeChartComponent } from './home-components/rpfp/pmoc/customize-by-monthly-income-chart/customize-by-monthly-income-chart.component'
import { CustomizePMOCTeamComponent } from './home-components/rpfp/pmoc/customize-pmoc-team/customize-pmoc-team.component'
import { AddMpcFdcDataComponent } from './home-components/rpfp/mpc-fdc/add-mpc-fdc-data/add-mpc-fdc-data.component'
import { AddMpcImagesComponent } from './home-components/rpfp/mpc-fdc/add-mpc-images/add-mpc-images.component'
import { AddMpcFdcTeamComponent } from './home-components/rpfp/mpc-fdc/add-mpc-fdc-team/add-mpc-fdc-team.component'
import { AddPersonnelInchargeComponent } from './home-components/rpfp/mpc-fdc/add-personnel-incharge/add-personnel-incharge.component'
import { ViewPersonnelInchargeComponent } from './home-components/rpfp/mpc-fdc/view-personnel-incharge/view-personnel-incharge.component'
import { ViewMpcFdcTeamComponent } from './home-components/rpfp/mpc-fdc/view-mpc-fdc-team/view-mpc-fdc-team.component'
import { ViewMpcFdcImagesComponent } from './home-components/rpfp/mpc-fdc/view-mpc-fdc-images/view-mpc-fdc-images.component'
import { AddTeenCenterComponent } from './home-components/ahyd/teen-centers/add-teen-center/add-teen-center.component'
import { AddFocalPersonComponent } from './home-components/ahyd/teen-centers/add-focal-person/add-focal-person.component'
import { AddFocalAhydTeamComponent } from './home-components/ahyd/teen-centers/add-focal-ahyd-team/add-focal-ahyd-team.component'
import { AddTcPersonnelInchargeComponent } from './home-components/ahyd/teen-centers/add-tc-personnel-incharge/add-tc-personnel-incharge.component'
import { ViewTcPersonnelInchargeComponent } from './home-components/ahyd/teen-centers/view-tc-personnel-incharge/view-tc-personnel-incharge.component'
import { ViewAhydTeamComponent } from './home-components/ahyd/teen-centers/view-ahyd-team/view-ahyd-team.component'
import { ViewFocalPersonsComponent } from './home-components/ahyd/teen-centers/view-focal-persons/view-focal-persons.component'
import { ViewTcImagesComponent } from './home-components/ahyd/teen-centers/view-tc-images/view-tc-images.component'
import { AddTcImagesComponent } from './home-components/ahyd/teen-centers/add-tc-images/add-tc-images.component'
import { MainInterceptor } from './Interceptors/main.interceptor'
import { AddFilesComponent } from './home-components/others/add-files/add-files.component'
import { AuthGuard } from './guards/auth.guard'
import { ContentWidthDirective } from './directives/content-width.directive'
import { AddAgeDistributionAndDependencyRatioComponent } from './home-components/population/add-age-distribution-and-dependency-ratio/add-age-distribution-and-dependency-ratio.component'
import { PopulationPyramidComponent } from './home/population/population-pyramid/population-pyramid.component'
import { SummaryComponentComponent } from './home/demographic/components/summary-component/summary-component.component'
import { SummaryWithPercentComponentComponent } from './home/demographic/components/summary-with-percent-component/summary-with-percent-component.component'
import { ByMunicipalityTableComponent } from './home/demographic/components/by-municipality-table/by-municipality-table.component'
import { ArrayToArrayValuesPipe } from './pipes/array-to-array-values.pipe'
import { RoundOffPipe } from './pipes/round-off.pipe'
import { AddMarriageDataComponent } from './home-components/demographic/marraiges/add-marriage-data/add-marriage-data.component'
import { CustomizeMarriageLocalDataComponent } from './home-components/demographic/marraiges/customize-marriage-local-data/customize-marriage-local-data.component'
import { TitleWithIconComponent } from './home/demographic/components/title-with-icon/title-with-icon.component'
import { TitleWithPercentComponent } from './home/demographic/components/title-with-percent/title-with-percent.component'
import { FileDropzoneComponent } from './components/file-dropzone/file-dropzone.component'
import { SingleFileUploadComponent } from './components/single-file-upload/single-file-upload.component'
import { OtherFilesComponent } from './home/others/other-files/other-files.component'
import { PercentPipePipe } from './pipes/percent-pipe.pipe'
import { BulkDataGuardGuard } from './guards/bulk-data-guard.guard'

// Directives

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
		AritclesAndSlidersComponent,
		OrganizationalChartComponent,
		FootersComponent,
		EditSliderImageComponent,
		AddArticleComponent,
		AddQuickLinksComponent,
		TopPopulatedComponent,
		AddPopulationProfileComponent,
		CustomizePyramidComponent,
		AddOfficialsComponent,
		ViewOfficialsComponent,
		CustomizeTechnicalNotesComponent,
		TechnicalNotesComponent,
		AddPersonnelDirectoryComponent,
		AddAwardsComponent,
		AddProgramComponent,
		AddServicesComponent,
		AddBirthDataComponent,
		MonthChartDataComponent,
		CustomizeBirthDataComponent,
		CustomizeTeenageComponent,
		CustomizeIllegitimateComponent,
		AddDeathDataComponent,
		AddLocalDeathDataComponent,
		AddCrudeDeathRateComponent,
		AddMigrationDataComponent,
		AddLocalMigrationDataComponent,
		CustomizeMigrationChartComponent,
		AddPmocDataComponent,
		EditPmocDataComponent,
		CustomizeCoupleChartComponent,
		CustomizeByAgeGroupChartComponent,
		CustomizeByAgeEmploymentStatusChartComponent,
		CustomizeByKnowledgeOnFpChartComponent,
		CustomizeByCivilStatusChartComponent,
		CustomizeByMonthlyIncomeChartComponent,
		CustomizePMOCTeamComponent,
		AddMpcFdcDataComponent,
		AddMpcImagesComponent,
		AddMpcFdcTeamComponent,
		AddPersonnelInchargeComponent,
		ViewPersonnelInchargeComponent,
		ViewMpcFdcTeamComponent,
		ViewMpcFdcImagesComponent,
		AddTeenCenterComponent,
		AddFocalPersonComponent,
		AddFocalAhydTeamComponent,
		AddTcPersonnelInchargeComponent,
		ViewTcPersonnelInchargeComponent,
		ViewAhydTeamComponent,
		ViewFocalPersonsComponent,
		ViewTcImagesComponent,
		AddTcImagesComponent,
		NotFoundComponent,
		NoInternetComponent,
		AddFilesComponent,
		ViewAdminsComponent,
		UnauthorizedComponent,
		ContentWidthDirective,
		AddAgeDistributionAndDependencyRatioComponent,
		PopulationPyramidComponent,
		SummaryComponentComponent,
		SummaryWithPercentComponentComponent,
		ByMunicipalityTableComponent,
		ArrayToArrayValuesPipe,
		RoundOffPipe,
		AddMarriageDataComponent,
		CustomizeMarriageLocalDataComponent,
		TitleWithIconComponent,
		TitleWithPercentComponent,
		FileDropzoneComponent,
		SingleFileUploadComponent,
		OtherFilesComponent,
		PercentPipePipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		IvyCarouselModule,
		BrowserAnimationsModule,

		ChartsModule,
		GoogleChartsModule,
		HttpClientModule,
		NgbModule,
		TextareaAutosizeModule,
		// Custom Modules
		AdminModule,
		ApprovalModule,
		LogsModule,
		RecordsModule,
		ExtrasModule,
		NgxDropzoneModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: MainInterceptor,
			multi: true,
		},
		AuthGuard,
		BulkDataGuardGuard,
	],
	bootstrap: [AppComponent],
	exports: [],
})
export class AppModule {}
