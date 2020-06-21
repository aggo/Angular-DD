import { Component, OnInit } from '@angular/core';

import { ToyService } from '../toy.service';
import { ToyCategoryService } from 'src/app/toy-categories/toy-category.service';

@Component({
    templateUrl: './toy-shell.component.html'
})
export class ToyShellComponent implements OnInit {
    pageTitle = 'Toys';

    constructor(private toyService: ToyService) { }

    ngOnInit(): void {
        // Set up the toy services
        this.toyService.start();
    }
}
