import { Component, Input, OnInit } from '@angular/core';
import Konva from 'konva';
import { ShapeService } from './../../services/serviceshapes/shape.service';
import {
  DimensionProps,
  defaultDimensionProps,
} from 'src/app/propriedades/propriedadescotas';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  dimensionProps: DimensionProps = defaultDimensionProps;
  @Input() x1?: number;
  @Input() x2?: number;
  @Input() y1?: number;
  @Input() y2?: number;
  @Input() largura?: number;
  @Input() altura?: number;
  @Input() update?: boolean;
  private quoteGroup: Konva.Group | null = null;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.shapeService.rectangleCreated.subscribe((details) => {
      this.x1 = details.x1;
      this.x2 = details.x2;
      this.y1 = details.y1;
      this.y2 = details.y2;
      this.largura = details.largura;
      this.altura = details.altura;
      this.update = details.update;

      this.drawQuote();
    });
  }

  drawQuote(): void {
    const stage = new Konva.Stage({
      container: 'quote-container',
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    if (!this.quoteGroup) {
      this.quoteGroup = new Konva.Group({
        draggable: true,
      });
      layer.add(this.quoteGroup);
    } else {
      this.quoteGroup.destroyChildren();
    }
    /*
    const cota_largura = this.createDimension(
      this.x1 as number,
      (this.y1 as number) +
        (this.altura as number) +
        defaultDimensionProps.ofssetcotas,
      this.x2 as number,
      (this.y2 as number) + defaultDimensionProps.ofssetcotas
    );
    this.quoteGroup.add(cota_largura);

    const cota_altura = this.createDimension(
      (this.x2 as number) + defaultDimensionProps.ofssetcotas,
      this.y1 as number,
      (this.x2 as number) + defaultDimensionProps.ofssetcotas,
      this.y2 as number,
      true
    );
    this.quoteGroup.add(cota_altura);

    const text_largura = new Konva.Text({
      x: (this.x1 as number) + (this.largura as number) / 2,
      y: (this.y2 as number) + defaultDimensionProps.ofssetlegendas + 3,
      text: Math.round(this.largura as number).toString(),
      fontSize: defaultDimensionProps.fontSize,
      fontFamily: defaultDimensionProps.fontFamily,
      fill: defaultDimensionProps.fontColor,
      align: defaultDimensionProps.align,
      draggable: defaultDimensionProps.draggable,
    });
    text_largura.offsetX(text_largura.width() / 2);
    this.quoteGroup.add(text_largura);

    const text_altura = new Konva.Text({
      x: (this.x2 as number) + 2 * defaultDimensionProps.ofssetlegendas,
      y: (this.y1 as number) + (this.altura as number) / 2,
      text: Math.round(this.altura as number).toString(),
      fontSize: defaultDimensionProps.fontSize,
      fontFamily: defaultDimensionProps.fontFamily,
      fill: defaultDimensionProps.fontColor,
      align: defaultDimensionProps.align,
      draggable: defaultDimensionProps.draggable,
      rotation: 90,
    });
    text_altura.offsetX(text_altura.width() / 2);
    this.quoteGroup.add(text_altura);

    stage.draw();

    // and finally, add the group to the shapeService as a single shape
    this.shapeService.addShape(this.quoteGroup);
  }
  */
    /*
  createDimension(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isVertical: boolean = false
  ): Konva.Group {
    const dimensionGroup = new Konva.Group({
      draggable: this.dimensionProps.draggable,
    });

    const dimensionLine = new Konva.Line({
      points: [startX, startY, endX, endY],
      stroke: this.dimensionProps.lineColor,
      strokeWidth: this.dimensionProps.strokeWidth,
    });

    dimensionGroup.add(dimensionLine);

    const arrowStartRotation =
      defaultDimensionProps.sides === 3
        ? isVertical
          ? 0
          : 270
        : isVertical
        ? defaultDimensionProps.rotationStartVertical
        : defaultDimensionProps.rotationStartHorizontal;
    const arrowEndRotation =
      defaultDimensionProps.sides === 3
        ? isVertical
          ? 180
          : 90
        : isVertical
        ? defaultDimensionProps.rotationEndVertical
        : defaultDimensionProps.rotationEndHorizontal;
    const arrowRadius =
      defaultDimensionProps.sides === 3 ? 10 : defaultDimensionProps.radius;

    const arrowStart = new Konva.RegularPolygon({
      x: startX,
      y: startY,
      sides: this.dimensionProps.sides,
      radius: this.dimensionProps.radius,
      fill: this.dimensionProps.lineColor,
      stroke: this.dimensionProps.lineColor,
      strokeWidth: this.dimensionProps.strokeWidth,
      rotation: arrowStartRotation,
    });
    dimensionGroup.add(arrowStart);

    const arrowEnd = new Konva.RegularPolygon({
      x: endX,
      y: endY,
      sides: this.dimensionProps.sides,
      radius: this.dimensionProps.radius,
      fill: this.dimensionProps.lineColor,
      stroke: this.dimensionProps.lineColor,
      strokeWidth: this.dimensionProps.strokeWidth,
      rotation: arrowEndRotation,
    });

    dimensionGroup.add(arrowEnd);

    return dimensionGroup;
  }
  */
  }
}
