import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdatequotesService {
  private larguraSubject = new BehaviorSubject<number>(0);
  largura$ = this.larguraSubject.asObservable();

  private x1Subject = new BehaviorSubject<number>(0);
  x1$ = this.x1Subject.asObservable();

  private x2Subject = new BehaviorSubject<number>(0);
  x2$ = this.x2Subject.asObservable();

  setValues(largura: number, x1: number, x2: number) {
    this.larguraSubject.next(largura);
    this.x1Subject.next(x1);
    this.x2Subject.next(x2);
  }
}
