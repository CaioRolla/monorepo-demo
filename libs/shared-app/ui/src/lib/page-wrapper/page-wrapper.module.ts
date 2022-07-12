import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroIconsModule } from 'ng-heroicons';

import { PageWrapperComponent } from './page-wrapper.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  declarations: [
    PageWrapperComponent,
    SidebarComponent,
    TopbarComponent

  ],
  imports: [
    CommonModule,

    HeroIconsModule
  ],
  exports: [
    PageWrapperComponent,
    SidebarComponent,
    TopbarComponent
  ],
  providers: [
    
  ]
})
export class PageWrapperModule { }
