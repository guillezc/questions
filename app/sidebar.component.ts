import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { VARS } from './vars';
import  'app/assets/layouts/layout/scripts/layout.min.js';

declare var Layout: any;

@Component({
    selector: 'q-sidebar',
    templateUrl: 'app/templates/sidebar.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class SidebarComponent {
	settings = VARS.SETTINGS;
	ngOnInit() {
		Layout.initSidebar();
	}

}