import { Component, OnInit } from '@angular/core';

var settings = {
    layout: {
        pageSidebarClosed: false, // sidebar menu state
        pageContentWhite: true, // set page content layout
        pageBodySolid: false, // solid body color state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: 'app/assets',
    globalPath: 'app/assets/global',
    layoutPath: 'app/assets/layouts/layout',
};

@Component({
    selector: 'q-header',
    templateUrl: 'app/templates/header.component.html'
})
export class HeaderComponent {
	settings = settings;
	ngOnInit() {
		Layout.initHeader();
	}

}