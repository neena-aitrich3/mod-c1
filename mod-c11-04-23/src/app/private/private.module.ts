import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { SharedModule } from '../shared/shared.module';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PublicDashboardComponent } from './components/public-dashboard/public-dashboard.component';
import { PublicUserProfileComponent } from './components/public-user-profile/public-user-profile.component';
import { PublicUserService } from './services/public-user.service';
import { PublicRegistrationService } from './services/public-registration.service';
import { ActiveUsersComponent } from './components/active-users/active-users.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import {NgxPaginationModule} from 'ngx-pagination'
import { ChartService } from './services/chart.service';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { LeadChartComponent } from './components/lead-chart/lead-chart.component';
import { LeadComponent } from './components/lead/lead.component';
import { CompanyAdminDashboardComponent } from './components/company-admin-dashboard/company-admin-dashboard.component';
import { SideNavComponent } from '../shared/components/side-nav/side-nav.component';
import { InfluenceVisitComponent } from './components/influence-visit/influence-visit.component';
import { LeadVolumeComponent } from './components/lead-volume/lead-volume.component';
import { UnproductiveVisitComponent } from './components/unproductive-visit/unproductive-visit.component';
import { HeaderNavComponent } from '../shared/components/header-nav/header-nav.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    PrivateComponent,
    CompanyDashboardComponent,
    AddUserComponent,
    EditUserComponent,
    PublicDashboardComponent,
    PublicUserProfileComponent,
    ActiveUsersComponent,
    PendingRequestsComponent,
    NavbarComponent,
    HeaderNavComponent,
    LeadChartComponent,
    LeadComponent,
    CompanyAdminDashboardComponent,
   
    SideNavComponent,
        InfluenceVisitComponent,
        LeadVolumeComponent,
        UnproductiveVisitComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule,
  NgxPaginationModule,
  // FontAwesomeModule
  
  ],
  providers: [UserService,PublicUserService,PublicRegistrationService,ChartService]
})
export class PrivateModule { }
