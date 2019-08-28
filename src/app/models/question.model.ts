import { Answer } from './answer.model';

export class Question {
    questionId: string;
    key: string;
    text: string;
    answers: Answer[];
}
