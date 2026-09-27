import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MaterialModule, IconsRegistryModule, RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
