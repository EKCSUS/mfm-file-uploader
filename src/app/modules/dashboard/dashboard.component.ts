import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="dashboard">
      <h2>Dashboard</h2>
      <p>Welcome back! Hook up real dashboard widgets here.</p>
    </section>
  `,
  styles: [
    `
      .dashboard {
        padding: 2rem;
      }

      h2 {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class DashboardComponent {}
