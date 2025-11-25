import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="layout">
      <app-header (toggleSidebar)="toggleSidebar()"></app-header>
      <div class="layout__body">
        <app-sidebar [open]="sidebarOpen"></app-sidebar>
        <main class="layout__content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .layout__body {
        flex: 1;
        display: flex;
      }

      .layout__content {
        flex: 1;
        padding: 2rem;
      }
    `,
  ],
})
export class LayoutComponent {
  constructor(){}
  sidebarOpen = true;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
