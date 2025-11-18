import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    SettingsComponent,
    RouterModule.forChild([{ path: '', component: SettingsComponent }]),
  ],
  exports: [RouterModule],
})
export class SettingsModule { }
