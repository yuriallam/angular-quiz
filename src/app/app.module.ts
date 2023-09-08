import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderComponent,
    UserListComponent,
    UserDetailsComponent,
    SearchBoxComponent,
    LoadingIndicatorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
