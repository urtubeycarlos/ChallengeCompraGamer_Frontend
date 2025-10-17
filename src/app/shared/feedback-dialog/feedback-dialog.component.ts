import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-feedback-dialog',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule],
    templateUrl: './feedback-dialog.component.html',
    styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
    @Input() message = '';
    @Input() type: 'success' | 'error' = 'success';
    @Output() closed = new EventEmitter<void>();

    close(): void {
        this.closed.emit();
    }
}