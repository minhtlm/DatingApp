import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
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
    ModalModule.forRoot()
  ],
  exports: [
    ToastrModule,
    BsDropdownModule,
    TabsModule,
    // NgxGalleryModule,
    NgxSpinnerModule,
    // FileUploadModule,
    ModalModule
  ]
})
export class SharedModule { }
