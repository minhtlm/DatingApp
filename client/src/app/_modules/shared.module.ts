import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { FileUploadModule } from 'ng2-file-upload';
// import { NgxGalleryModule } from '@kolkov/ngx-gallery';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule,
    BsDropdownModule,
    TabsModule.forRoot(),
    // NgxGalleryModule,
    NgxSpinnerModule,
    // FileUploadModule,
  ],
  exports: [
    ToastrModule,
    BsDropdownModule,
    TabsModule,
    // NgxGalleryModule,
    NgxSpinnerModule,
    // FileUploadModule,
  ]
})
export class SharedModule { }
