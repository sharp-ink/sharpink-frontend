import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastrService: ToastrService) { }

    info(message: string, title?: string) {
        if (title) {
            this.toastrService.info(message, title);
        } else {
            this.toastrService.info(message);
        }
    }

    error(message: string, title?: string) {
        if (title) {
            this.toastrService.error(message, title);
        } else {
            this.toastrService.error(message);
        }
    }

    success(message: string, title?: string) {
        if (title) {
            this.toastrService.success(message, title);
        } else {
            this.toastrService.success(message);
        }
    }

    warning(message: string, title?: string) {
        if (title) {
            this.toastrService.warning(message, title);
        } else {
            this.toastrService.warning(message);
        }
    }

}
