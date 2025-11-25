import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toastId: number | null = null;
  constructor(private toastr: ToastrService) {
    this.showLoader();
  }

  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  showError(message: string, title?: string): void {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title?: string): void {
    this.toastr.warning(message, title);
  }

  showInfo(message: string, title?: string): void {
    this.toastr.info(message, title);
  }

   showLoader(): void {
    this.toastId = this.toastr.info('Loading...', '', {
      disableTimeOut: true,
      closeButton: false,
      tapToDismiss: false,
      positionClass: 'toast-center-center',  // Custom center class
      toastClass: 'ngx-toastr loader-toast'
    }).toastId;
  } 

  clearLoader(){
    if (this.toastId) {
      this.toastr.clear(this.toastId);
    }
  }
  
}