import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: true,
    imports: [LottieComponent, CommonModule]
})
export class LoadingComponent implements OnInit {
    options: AnimationOptions = {
        loop: true,
        autoplay: true,
        path: 'assets/animations/bus-loading.json',
    };

    constructor(private router: Router) { }

    ngOnInit(): void {
        const delay = Math.floor(Math.random() * (1500 - 300 + 1)) + 300;
        setTimeout(() => {
            this.router.navigate(['/micros']);
        }, delay);
    }
}