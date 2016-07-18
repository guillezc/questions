import { Injectable } from '@angular/core';
import { Question } from '../classes/question';

let QUESTS: Question[] = [
	{id: 1, pregunta: "Esta es la pregunta 1", usuario: "Memo", creacion: "14/07/2016 17:53:30"},
	{id: 2, pregunta: "Esta es la pregunta 2", usuario: "Memo", creacion: "14/07/2016 17:54:30"},
	{id: 3, pregunta: "Esta es la pregunta 3", usuario: "Listico", creacion: "14/07/2016 17:56:30"}
]

@Injectable()
export class QuestionService{
	getQuestions(){
		return Promise.resolve(QUESTS);
	}
}