import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
    selector: 'questions-app',
    templateUrl: 'app/templates/app.component.html',
    directives: [HeaderComponent]
})

export class AppComponent { }
