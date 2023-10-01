import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root',
})
export class TransformershapesService {
  constructor() {}

  private transformer: Konva.Transformer | null = null;
  private rotationText: Konva.Text | null = null;
  update: any; // Variable declaration
  private rotationHistory: number[] = [];
  attachTransformer(layer: Konva.Layer, shape: Konva.Shape) {
    // Remove the previous transformer and rotation text if they exist
    this.removeTransformer();
    this.removeRotationText();

    // Create a new transformer and attach it to the shape
    this.transformer = new Konva.Transformer({
      enabledAnchors: [
        'top-left',
        'top-center',
        'top-right',
        'middle-right',
        'middle-left',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      rotateAnchorOffset: 60,
      rotationSnaps: [0, 90, 180, 270],
      anchorCornerRadius: 6,
      anchorStrokeWidth: 1,
      anchorStroke: '#39A2DD',
      anchorFill: '#fff',
      anchorSize: 10,
      borderStroke: '#39A2DD',
      borderDash: [4, 4],
      cursor: 'move',
      rotateCursor: 'crosshair',
    });

    this.transformer.nodes([shape]);

    // Create a text to display the rotation angle
    // Create a text to display the rotation angle
    this.rotationText = new Konva.Text({
      text: '',
      fontSize: 12,
      fontFamily: 'Arial',
      fill: '#000',
    });

    shape.on('transform', () => {
      const rotation = shape.rotation();

      // Convert radians to degrees
      let rotationDeg = (rotation * 180) / Math.PI;

      // Normalize the rotation angle to be within the range of 0-360 degrees
      rotationDeg = (((rotationDeg + 360) % 360) + 360) % 360;

      // Adjust the rotation angle to the nearest multiple of 90 degrees
      const snapAngles = [0, 90, 180, 270, 360];
      let closestAngle = snapAngles[0];

      for (let i = 1; i < snapAngles.length; i++) {
        if (
          Math.abs(rotationDeg - snapAngles[i]) <
          Math.abs(rotationDeg - closestAngle)
        ) {
          closestAngle = snapAngles[i];
        }
      }

      rotationDeg = closestAngle;

      // Update the rotation text
      if (this.rotationText) {
        const shapeAbsolutePosition = shape.getAbsolutePosition();
        const shapeWidth = shape.width();
        const textWidth = this.rotationText.width();
        const textX = shapeAbsolutePosition.x + shapeWidth / 2 - textWidth / 2;
        const textY = shapeAbsolutePosition.y - 20;

        this.rotationText.text(`Rotation: ${rotationDeg.toFixed(2)}°`);
        layer.batchDraw(); // Use batchDraw() before updating text position
        this.rotationText.position({ x: textX, y: textY });
      }

      this.rotationHistory.push(rotationDeg); // Add the rotationDeg value to the array
      console.log(this.rotationHistory); // Display the array in the console.log

      layer.batchDraw(); // Use batchDraw() instead of layer.draw() for better performance
    });
    // Add the transformer and rotation text to the layer
    layer.add(this.transformer);
    layer.add(this.rotationText);
    layer.batchDraw(); // Use batchDraw() instead of layer.draw() for better performance
  }

  removeTransformer() {
    // Remove the transformer if it exists
    if (this.transformer) {
      this.transformer.detach();
      this.transformer.destroy();
      this.transformer = null;
    }
  }

  removeRotationText() {
    // Remove the rotation text if it exists
    if (this.rotationText) {
      this.rotationText.destroy();
      this.rotationText = null;
    }
  }
}
