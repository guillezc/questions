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


let _questions: Question[] = [
	{id: 1, pregunta: "Esta es la pregunta 1", usuario: "Memo", creacion: "14/07/2016 17:53:30"},
	{id: 2, pregunta: "Esta es la pregunta 2", usuario: "Memo", creacion: "14/07/2016 17:54:30"},
	{id: 3, pregunta: "Esta es la pregunta 3", usuario: "Listico", creacion: "14/07/2016 17:56:30"}
]

export const VARS = {
	SETTINGS: _settings,
	QUESTIONS: _questions
}