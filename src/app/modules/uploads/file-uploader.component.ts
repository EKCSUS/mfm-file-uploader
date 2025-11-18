import { Component, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  private readonly endpoint = `${environment.apiUrl}/files/upload`;
  private fileSignal = signal<File | null>(null);
  private uploadingSignal = signal(false);
  private messageSignal = signal('');
  private progressSignal = signal(0);

  selectedFile: Signal<File | null> = computed(() => this.fileSignal());
  uploading: Signal<boolean> = computed(() => this.uploadingSignal());
  message: Signal<string> = computed(() => this.messageSignal());
  progress: Signal<number> = computed(() => this.progressSignal());

  constructor(private http: HttpClient) {}

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

    const formData = new FormData();
    formData.append('file', file);

    this.uploadingSignal.set(true);
    this.progressSignal.set(0);
    setTimeout(() => {
        this.http
      .post(this.endpoint, formData, {
        observe: 'events',
        reportProgress: true,
      })
      .subscribe({
        next: (event) => this.handleUploadEvent(event),
        error: () => {
          this.messageSignal.set('Upload failed. Please try again.');
          this.uploadingSignal.set(false);
          this.progressSignal.set(0);
        },
      });
    }, 3000);
  }

  private handleUploadEvent(event: HttpEvent<unknown>): void {
    if (event.type === HttpEventType.UploadProgress) {
      const percent = event.total
        ? Math.round((event.loaded / event.total) * 100)
        : 0;
      this.progressSignal.set(percent);
    } else if (event.type === HttpEventType.Response) {
      this.messageSignal.set('File uploaded successfully');
      this.fileSignal.set(null);
      this.uploadingSignal.set(false);
      this.progressSignal.set(100);
    }
  }
  
}
