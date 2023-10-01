import { Injectable } from '@angular/core';
import Konva from 'konva';
@Injectable({
  providedIn: 'root',
})
export class OrganizeShapesService {
  private shapes: Konva.Shape[] = [];
  private selectedShape: Konva.Shape | null = null;

  constructor() {}

  setSelectedShape(shape: Konva.Shape): void {
    this.selectedShape = shape;
  }

  addShape(shape: Konva.Shape): void {
    this.shapes.push(shape);
  }

  bringToFront(): void {
    if (this.selectedShape) {
      this.selectedShape.moveToTop();
      this.selectedShape.getLayer()?.draw();
    }
  }

  bringForward(): void {
    if (this.selectedShape) {
      this.selectedShape.moveUp();
      this.selectedShape.getLayer()?.draw();
    }
  }

  sendBackward(): void {
    if (this.selectedShape) {
      this.selectedShape.moveDown();
      this.selectedShape.getLayer()?.draw();
    }
  }
  sendToBack(): void {
    if (this.selectedShape) {
      this.selectedShape.moveToBottom();
      this.selectedShape.getLayer()?.draw();
    }
  }
}
