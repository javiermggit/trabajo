import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private messageService = inject(MessageService)

  // constructor(private messageService: MessageService) { }

  showSuccess(summary: string, detail?: string) {
    this.messageService.add({ severity: 'success', summary, detail, icon: 'ri-checkbox-circle-line text-2xl'});
  }

  showInfo(summary: string, detail?: string) {
    this.messageService.add({ severity: 'info', summary, detail, icon: 'ri-information-2-line text-2xl' });
  }

  showWarn(summary: string, detail?: string) {
    this.messageService.add({ severity: 'warn', summary, detail, icon: 'ri-alarm-warning-line text-2xl' });
  }

  showError(summary: string, detail?: string) {
    this.messageService.add({ severity: 'error', summary, detail, icon: 'ri-close-circle-line text-2xl' });
  }

  showCustom(severity: string, summary: string, detail?: string, icon?: string) {
    this.messageService.add({ severity, summary, detail, icon: `text-2xl ${icon}` });
  }
}
