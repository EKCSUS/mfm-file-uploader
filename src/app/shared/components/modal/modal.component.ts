import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <div class="backdrop" (click)="close()"></div>
    <div class="modal" role="dialog">
      <header><ng-content select="[modal-title]"></ng-content></header>
      <section><ng-content></ng-content></section>
      <footer><ng-content select="[modal-actions]"></ng-content></footer>
    </div>
  `,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.3);
      }

      .modal {
        position: relative;
        background: #fff;
        border-radius: 0.5rem;
        padding: 1.5rem;
        min-width: 20rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class ModalComponent {
  @Input() visible = false;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
