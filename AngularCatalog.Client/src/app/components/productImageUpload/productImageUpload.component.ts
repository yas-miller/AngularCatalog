import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview'
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/productsservice';
import { UserService } from '../../../services/userservice';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { showInfo } from '../../../state/base/actions';


@Component({
  standalone: true,
  selector: "ProductImageUpload",
  templateUrl: './productImageUpload.component.html',
  styleUrl: './productImageUpload.component.css',
  imports: [
    InputTextModule,
    CommonModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    RippleModule,
    TabViewModule,
    SidebarModule,
    InputNumberModule,
    FileUploadModule,
    ToastModule,
    BadgeModule
]
})
export class ProductImageUpload {
    @Input() public uploadedImageUrl: string | null | undefined
    @Output() public uploadedImageUrlChange: EventEmitter<string | null> = new EventEmitter<string | null>();

    uploadApiUrl: string = "/api/products/uploadImage"
    maxFileSizeBytes: number = 10000000
    maxFilesCount: number = 1
    files : File[] = [];

    totalSize : number = 0;

    totalPercent : number = 0;

    constructor(private primengConfig: PrimeNGConfig, private store: Store<any>) {
        this.primengConfig.ripple = true;
    }

    
    choose(callback: () => void) {
        callback();
    }

    onRemoveTemplatingFile(event: any, file: File, removeFileCallback: (arg0: any, arg1: any) => void, index: any) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalPercent = 0;
        this.files = [];

        this.uploadedImageUrlChange.emit(null);
    }
    onRemoveUploadedFile(event: any, file: File, removeUploadedFileCallback: (arg0: any, arg1: any) => void, index: any) {
        removeUploadedFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalPercent = 0;
        this.files = [];

        this.uploadedImageUrlChange.emit(null);
    }

    onTemplatedUpload(event: any) {
        if (event.originalEvent.status === 200) {
            this.store.dispatch(showInfo({ infoString: 'Файл успешно загружен' + ': ' + event.files[0].name }));

            this.uploadedImageUrlChange.emit(event.originalEvent.body.url);
        }
    }

    onSelectedFiles(event: FileSelectEvent) {
        this.files = event.currentFiles;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalPercent = 100;
    }

    uploadEvent(callback: () => void) {
        callback();
    }

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.primengConfig.translation.fileSizeTypes;
        if (bytes === 0) {
            return `0 ${sizes![0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes![i]}`;
    }
}
