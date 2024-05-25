import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CacheService } from './services/cache.service'; // Import CacheService
import { ApiService } from './services/api.service'; // Import ApiService

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add FormsModule here
  ],
  providers: [CacheService, ApiService], // Provide CacheService and ApiService here
  bootstrap: [AppComponent]
})
export class AppModule { }
