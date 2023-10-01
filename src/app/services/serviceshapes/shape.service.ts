import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Konva from 'konva';

interface RectangleDetails {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  largura: number;
  altura: number;
  update: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShapeService implements OnDestroy {
  private shapesSubject = new BehaviorSubject<any[]>([]);
  shapes$ = this.shapesSubject.asObservable();

  public rectangleCreated = new EventEmitter<RectangleDetails>();

  addShape(shape: any) {
    const shapes = this.shapesSubject.value || [];
    shapes.push(shape);
    this.shapesSubject.next(shapes);
  }

  private quoteGroupSubject = new BehaviorSubject<Konva.Group | null>(null);
  quoteGroup$ = this.quoteGroupSubject.asObservable();

  emitQuoteGroup(quoteGroup: Konva.Group | null) {
    this.quoteGroupSubject.next(quoteGroup);
  }

  emitRectangleDetails(
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    largura: number,
    altura: number,
    update: boolean
  ) {
    const rectangleDetails: RectangleDetails = {
      x1: x1,
      x2: x2,
      y1: y1,
      y2: y2,
      largura: largura,
      altura: altura,
      update: update,
    };

    this.rectangleCreated.emit(rectangleDetails);
  }

  ngOnDestroy() {
    // Limpeza e descarte de recursos quando o serviço for destruído
  }
}
