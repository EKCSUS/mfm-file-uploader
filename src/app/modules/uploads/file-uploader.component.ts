import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../core/services/toaster.service';
import { AuthService, ENDPOINTS } from '../../core';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  private fileSignal = signal<File | null>(null);
  private uploadingSignal = signal(false);
  private messageSignal = signal('');
  private progressSignal = signal(0);
  isAuthorized: string = '';
  private projectId: string = '';
  private fileName: string = '';
  private userId: string = '';
  public isUploaded:boolean = false;
  private userData: any;

  selectedFile: Signal<File | null> = computed(() => this.fileSignal());
  uploading: Signal<boolean> = computed(() => this.uploadingSignal());
  message: Signal<string> = computed(() => this.messageSignal());
  progress: Signal<number> = computed(() => this.progressSignal());

  constructor(
    private _router: ActivatedRoute,
    private _authService: AuthService,
    private _toasterService: ToasterService,
    private _http: HttpClient
  ) {}

 ngOnInit(): void {
  this._router.queryParams.subscribe((params) => {
    this.userId = params['userId'] || 'rajank@mediaferry.com';
    this.projectId = params['projectId'];
    this.fileName = params['fileName'];

    // Check missing params
    if ( !this.projectId || !this.fileName) {
      this._toasterService.clearLoader();
      this.isAuthorized = 'failure';

      // Decide specific error message
      // if (!this.userId) {
      //   this._toasterService.showError('User Id is missing.', 'Error');
      // } else 
        if (!this.projectId) {
        this._toasterService.showError('Project Id is missing.', 'Error');
      } else if (!this.fileName) {
        this._toasterService.showError('File Name is missing.', 'Error');
      }

      return;
    }

    // If valid
    this.validateUser(this.userId);
  });
}


  validateUser(userId: string) {
    this._authService.isUserExists({ userId }).subscribe({
      next: (response: any) => {
        this._toasterService.clearLoader();
        if (response && response.exists) {
          this.isAuthorized = 'success';
          this.userData = response.user;
          this._authService.setToken(response.googleAccessToken || "");
        } else {
          this.isAuthorized = 'failure';
        }
      },
      error: (error) => {
        this._toasterService.clearLoader();
        this.isAuthorized = 'failure';
      },
      complete: () => {
        // Optional: run on complete
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.fileSignal.set(file);
    this.messageSignal.set('');
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const file = this.selectedFile();
    if (!file || this.uploading()) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // remove prefix

      const payload = {
        projectId: this.projectId,
        fileName: this.fileName,
        fileData: base64String,
        userId : this.userData['_id']
      };
      this.uploadingSignal.set(true);
      this.progressSignal.set(0);

      const url = environment.apiUrl + ENDPOINTS.users.uploadileInGooggleDrive;
      this._http
        .post(url, payload, {
          observe: 'events',
          reportProgress: true,
        })
        .subscribe({
          next: (event) => this.handleUploadEvent(event),
          error: (error) => {
            this.isUploaded = false
            this.messageSignal.set(error?.error?.message || 'Upload failed. Please try again.');
            this.uploadingSignal.set(false);
            this.progressSignal.set(0);
          },
        });
      // this.uploadFile(payload);
    };

    reader.readAsDataURL(file);
  }

  private handleUploadEvent(event: HttpEvent<unknown>): void {
    if (event.type === HttpEventType.UploadProgress) {
      const percent = event.total
        ? Math.round((event.loaded / event.total) * 100)
        : 0;
      this.progressSignal.set(percent);
    } else if (event.type === HttpEventType.Response) {
      this.isUploaded = true;
      this.messageSignal.set('File uploaded successfully');
      this.fileSignal.set(null);
      this.uploadingSignal.set(false);
      this.progressSignal.set(100);
    }
  }
}
