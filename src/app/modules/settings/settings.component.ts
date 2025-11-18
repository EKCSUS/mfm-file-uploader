import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
      trustedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, ) {
    const url = "https://mfmqa.mediaferry.com/dashboard";
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
