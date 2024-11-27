import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: "ToastGlobal",
  templateUrl: './toastGlobal.component.html',
  styleUrl: './toastGlobal.component.css',
  imports: [
    ButtonModule, 
    ToastModule
  ]
})
export class ToastGlobal {
  constructor(private messageService: MessageService, private store: Store<any>) {
    store.pipe(select(store => store.storeBaseReducer.infoString)).subscribe(infoString => {
      if (infoString) {
        this.showInfo(infoString);
      }
    });
    store.pipe(select(store => store.storeBaseReducer.errorString)).subscribe(errorString => {
      if (errorString) {
        this.showError(errorString);
      }
    });
  }


  showInfo(messageContent: string) {
      this.messageService.add({ key: "global-toast", severity: 'info', summary: 'Инфо', detail: messageContent });
  }
  
  showError(messageContent: string) {
    this.messageService.add({ key: "global-toast", severity: 'error', summary: 'Ошибка', detail: messageContent });
  }

  showSuccess(messageContent: string) {
    this.messageService.add({ key: "global-toast", severity: 'success', summary: 'Успешно', detail: messageContent });
  }

  showWarn(messageContent: string) {
      this.messageService.add({ key: "global-toast", severity: 'warn', summary: 'Предупреждение', detail: messageContent });
  }

  showContrast(messageContent: string) {
      this.messageService.add({ key: "global-toast", severity: 'contrast', summary: 'Ошибка', detail: messageContent });
  }

  showSecondary(messageContent: string) {
      this.messageService.add({ key: "global-toast", severity: 'secondary', summary: 'Дополнительное инфо', detail: messageContent });
  }
}
