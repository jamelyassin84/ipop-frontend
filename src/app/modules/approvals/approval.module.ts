import { RecordsModule } from './../records/records.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExtrasModule } from '../extras/extras.module'
import { ApprovalsComponent } from './content/approve-requests/approvals/approvals.component'
import { IndexComponent } from './content/approve-requests/index/index.component'
import { ApprovalActivityComponent } from './content/approve-requests/components/program-areas/approval-activity/approval-activity.component'
import { ApprovalAwardComponent } from './content/approve-requests/components/about/approval-award/approval-award.component'
import { ApprovalOrganizationalChartComponent } from './content/approve-requests/components/about/approval-organizational-chart/approval-organizational-chart.component'
import { ApprovalServicesOfferedComponent } from './content/approve-requests/components/services/approval-services-offered/approval-services-offered.component'
import { ApprovalBirthStatisticComponent } from './content/approve-requests/components/demographics/births/approval-birth-statistic/approval-birth-statistic.component'
import { ApprovalDeathStatisticComponent } from './content/approve-requests/components/demographics/deaths/approval-death-statistic/approval-death-statistic.component'
import { ApprovalMigrationStatisticComponent } from './content/approve-requests/components/demographics/migrations/approval-migration-statistic/approval-migration-statistic.component'
import { ApprovalPopulationProfileComponent } from './content/approve-requests/components/population/approval-population-profile/approval-population-profile.component'
import { ApprovalAgeDistributionComponent } from './content/approve-requests/components/population/approval-age-distribution/approval-age-distribution.component'
import { ApprovalArticleComponent } from './content/approve-requests/components/news/approval-article/approval-article.component'
import { ApprovalIncidenceComponent } from './content/approve-requests/components/demographics/approval-incidence/approval-incidence.component'
import { ApprovalMonthChartComponent } from './content/approve-requests/components/demographics/approval-month-chart/approval-month-chart.component'
import { ApprovalMPCFDCPersonnelComponent } from './content/approve-requests/components/officials/approval-mpcfdcpersonnel/approval-mpcfdcpersonnel.component'
import { ApprovalMPCFDCTeamComponent } from './content/approve-requests/components/officials/approval-mpcfdcteam/approval-mpcfdcteam.component'
import { ApprovalMunicipalOfficialComponent } from './content/approve-requests/components/officials/approval-municipal-official/approval-municipal-official.component'
import { ApprovalPMOCComponent } from './content/approve-requests/components/rpfp/pmoc/approval-pmoc/approval-pmoc.component'
import { ApprovalPMOCTeamComponent } from './content/approve-requests/components/officials/approval-pmocteam/approval-pmocteam.component'
import { ApprovalProvincialOfficialComponent } from './content/approve-requests/components/officials/approval-provincial-official/approval-provincial-official.component'
import { ApprovalSPMemberComponent } from './content/approve-requests/components/officials/approval-spmember/approval-spmember.component'
import { ApprovalBarangayOfficialsComponent } from './content/approve-requests/components/officials/approval-barangay-officials/approval-barangay-officials.component'
import { AwardMediaApprovalsComponent } from './content/approve-requests/components/about/award-media-approvals/award-media-approvals.component'
import { ApprovalsPersonnelDirectoryComponent } from './content/approve-requests/components/about/personnel-directory/personnel-directory.component'
import { QuickLinkComponent } from './content/approve-requests/components/news/quick-link/quick-link.component'
import { ApprovalTechnicalNotesComponent } from './content/approve-requests/components/others/approval-technical-notes/approval-technical-notes.component'
import { ApprovalTopPopulationComponent } from './content/approve-requests/components/population/approval-top-population/approval-top-population.component'
import { ApprovalSliderComponent } from './content/approve-requests/components/news/approval-slider/approval-slider.component'
import { ApprovalSBMPTCTeamComponent } from './content/approve-requests/components/officials/approval-sbmptcteam/approval-sbmptcteam.component'
import { ApprovalSBMPTCPersonnelComponent } from './content/approve-requests/components/officials/approval-sbmptcpersonnel/approval-sbmptcpersonnel.component'
import { ApprovalSBMPTCFocalPersonComponent } from './content/approve-requests/components/officials/approval-sbmptcfocal-person/approval-sbmptcfocal-person.component'
import { ApprovalSBMPTCComponent } from './content/approve-requests/components/ahyd/teen-center/approval-sbmptc/approval-sbmptc.component'
import { ApprovalMPCFDCComponent } from './content/approve-requests/components/rpfp/mpc-fdc/approval-mpcfdc/approval-mpcfdc.component'
import { RequestsComponent } from './content/delete-requests/requests/requests.component'
import { DeleteRequestIndexComponent } from './content/delete-requests/delete-request-index/delete-request-index.component'
import { SpinnerLoaderComponent } from 'src/app/components/loaders/spinner-loader/spinner-loader.component'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ApprovalAgeDistributionAndAgeDependencyRatioComponent } from './content/approve-requests/components/population/approval-age-distribution-and-age-dependency-ratio/approval-age-distribution-and-age-dependency-ratio.component'
import { SummaryWithPercentComponentComponent } from 'src/app/home/demographic/components/summary-with-percent-component/summary-with-percent-component.component'
import { SummaryComponentComponent } from 'src/app/home/demographic/components/summary-component/summary-component.component';
import { ApprovalMarriagesComponent } from './content/approve-requests/components/demographics/marriages/approval-marriages/approval-marriages.component';
import { JsonComponent } from './content/approve-requests/components/json/json.component'

@NgModule({
	declarations: [
		ApprovalsComponent,
		IndexComponent,
		ApprovalActivityComponent,
		ApprovalAwardComponent,
		ApprovalOrganizationalChartComponent,
		ApprovalServicesOfferedComponent,
		ApprovalBirthStatisticComponent,
		ApprovalDeathStatisticComponent,
		ApprovalMigrationStatisticComponent,
		ApprovalPopulationProfileComponent,
		ApprovalAgeDistributionComponent,
		ApprovalArticleComponent,
		ApprovalIncidenceComponent,
		ApprovalMonthChartComponent,
		ApprovalMPCFDCComponent,
		ApprovalMPCFDCPersonnelComponent,
		ApprovalMPCFDCTeamComponent,
		ApprovalMunicipalOfficialComponent,
		ApprovalPMOCComponent,
		ApprovalPMOCTeamComponent,
		ApprovalProvincialOfficialComponent,
		ApprovalSPMemberComponent,
		ApprovalSBMPTCComponent,
		ApprovalSBMPTCFocalPersonComponent,
		ApprovalSBMPTCPersonnelComponent,
		ApprovalSBMPTCTeamComponent,
		ApprovalSliderComponent,
		ApprovalTopPopulationComponent,
		ApprovalTechnicalNotesComponent,
		QuickLinkComponent,
		ApprovalsPersonnelDirectoryComponent,
		AwardMediaApprovalsComponent,
		ApprovalBarangayOfficialsComponent,
		RequestsComponent,
		DeleteRequestIndexComponent,
		SpinnerLoaderComponent,
		ApprovalAgeDistributionAndAgeDependencyRatioComponent,
		SummaryComponentComponent,
		SummaryWithPercentComponentComponent,
  ApprovalMarriagesComponent,
  JsonComponent,
	],
	imports: [
		CommonModule,
		ExtrasModule,
		RecordsModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
	],
	exports: [
		ApprovalsComponent,
		IndexComponent,
		ApprovalActivityComponent,
		ApprovalAwardComponent,
		ApprovalOrganizationalChartComponent,
		ApprovalServicesOfferedComponent,
		ApprovalBirthStatisticComponent,
		ApprovalDeathStatisticComponent,
		ApprovalMigrationStatisticComponent,
		ApprovalPopulationProfileComponent,
		ApprovalAgeDistributionComponent,
		ApprovalArticleComponent,
		ApprovalIncidenceComponent,
		ApprovalMonthChartComponent,
		ApprovalMPCFDCComponent,
		ApprovalMPCFDCPersonnelComponent,
		ApprovalMPCFDCTeamComponent,
		ApprovalMunicipalOfficialComponent,
		ApprovalPMOCComponent,
		ApprovalPMOCTeamComponent,
		ApprovalProvincialOfficialComponent,
		ApprovalSPMemberComponent,
		ApprovalSBMPTCComponent,
		ApprovalSBMPTCFocalPersonComponent,
		ApprovalSBMPTCPersonnelComponent,
		ApprovalSBMPTCTeamComponent,
		ApprovalSliderComponent,
		ApprovalTopPopulationComponent,
		ApprovalTechnicalNotesComponent,
		QuickLinkComponent,
		ApprovalsPersonnelDirectoryComponent,
		AwardMediaApprovalsComponent,
		ApprovalBarangayOfficialsComponent,
		SpinnerLoaderComponent,
		SummaryComponentComponent,
		SummaryWithPercentComponentComponent,
	],
})
export class ApprovalModule {}
