import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  imports: [
    FileUploaderComponent,
    RouterModule.forChild([
      { path: '', component: FileUploaderComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadsModule {}
