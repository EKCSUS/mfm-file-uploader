import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  template: `
    <aside class="sidebar" [class.sidebar--open]="open">
      <a routerLink="/dashboard" routerLinkActive="active">
        <span class="icon" aria-hidden="true">📊</span>
        <span>Dashboard</span>
      </a>
      <a routerLink="/upload-file" routerLinkActive="active">
        <span class="icon" aria-hidden="true">📤</span>
        <span>Uploader</span>
      </a>
      <a routerLink="/settings" routerLinkActive="active">
        <span class="icon" aria-hidden="true">⚙️</span>
        <span>Settings</span>
      </a>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        width: 16rem;
        background: #fff;
        border-right: 1px solid #e0e0e0;
        padding: 1rem;
        display: none;
        flex-direction: column;
        gap: 0.5rem;
      }

      .sidebar--open {
        display: flex;
      }

      a {
        color: #3f51b5;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        transition: background 0.2s ease;
      }

      a:hover {
        background: rgba(63, 81, 181, 0.08);
      }

      a.active {
        font-weight: 600;
        background: rgba(63, 81, 181, 0.12);
      }

      .icon {
        font-size: 1.2rem;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() open = true;
}
