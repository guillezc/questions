import { Injectable } from '@angular/core';
import { Question } from '../classes/question';
import { VARS } from '../vars';

@Injectable()
export class QuestionService{
	getQuestions(){
		return Promise.resolve(VARS.QUESTIONS);
	}
}