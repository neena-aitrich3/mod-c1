import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicUserService } from '../private/services/public-user.service';
//import { HeaderNavComponent } from './components/header-nav/header-nav.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { SideNavComponent } from './components/side-nav/side-nav.component';
// import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    // NavbarComponent
  
    // SideNavComponent
  
    //HeaderNavComponent
  ],
  imports: [
    CommonModule,
    // FontAwesomeModule
  ],
  providers: [PublicUserService]
})
export class SharedModule { }
