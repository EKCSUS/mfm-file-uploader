import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `<div class="loader" aria-label="Loading"></div>`,
  styles: [
    `
      .loader {
        width: 3rem;
        height: 3rem;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top-color: #3f51b5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 1rem auto;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {}
