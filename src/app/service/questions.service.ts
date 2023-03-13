import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Questions } from '../models/questions.models';
// import { NewQuestion } from '../models/new-question.model';
// import { Questions, QuestionsResponse } from '../models/questions.models';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get('http://localhost:3000/questions')
    .pipe(map((res) => 
    res))
  }

  createQuestion(newQuestion: Questions): Observable<any> {
    return this.http.post('http://localhost:3000/questions', newQuestion)
    .pipe(map((res) => res))
  }

  editQuestion(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/questions/${id}`, data);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/questions/${id}`);
  }
}
