import { Question } from './classes/question';

let _settings = {
    layout: {
        pageSidebarClosed: false, // sidebar menu state
        pageContentWhite: true, // set page content layout
        pageBodySolid: false, // solid body color state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: 'app/assets',
    globalPath: 'app/assets/global',
    layoutPath: 'app/assets/layouts/layout'
}


let _questions: Question[] = []

export const VARS = {
	SETTINGS: _settings,
	QUESTIONS: _questions
}