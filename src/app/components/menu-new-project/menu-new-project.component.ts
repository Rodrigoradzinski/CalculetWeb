import {
  defaultCircleProperties,
  defaultLineProperties,
  defaultRectangleProperties,
} from './../../propriedades/propriedadesshapes';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import Konva from 'konva';
import { ShapeService } from 'src/app/services/serviceshapes/shape.service';
import { UpdatequotesService } from 'src/app/services/serviceshapes/updatequotes.service';
import * as MakerJs from 'makerjs';

@Component({
  selector: 'app-menu-new-project',
  templateUrl: './menu-new-project.component.html',
  styleUrls: ['./menu-new-project.component.css'],
})
export class MenuNewProjectComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: false }) containerRef!: ElementRef;

  private stage!: Konva.Stage;
  private layers: Konva.Layer[] = [];
  private selectedLayerIndex = 0;
  public isSidenavOpen = true;
  private rectangle: string = '';

  //atributos para cotas
  rectangleX1: number = 0;
  rectangleX2: number = 0;
  rectangleY1: number = 0;
  rectangleY2: number = 0;
  rectangleWidth: number = 0;
  rectangleHeight: number = 0;

  constructor(
    private shapeService: ShapeService,
    private updatequotesService: UpdatequotesService
  ) {}

  ngOnInit() {
    // Inscreva-se para receber as atualizações de x1 e x2
    this.updatequotesService.x1$.subscribe((x1: number) => {
      // Faça o que for necessário com o valor de x1
      console.log('x1:', x1);
    });

    this.updatequotesService.x2$.subscribe((x2: number) => {
      // Faça o que for necessário com o valor de x2
      console.log('x2:', x2);
    });
  }

  ngAfterViewInit() {
    this.stage = new Konva.Stage({
      container: this.containerRef.nativeElement,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const initialLayer = new Konva.Layer();
    this.stage.add(initialLayer);
    this.layers.push(initialLayer);
  }

  addRectangle(): void {
    const currentLayer = this.getCurrentLayer();
    if (currentLayer) {
      const rectangle = new Konva.Rect({
        x: this.stage.width() / 2 - 100,
        y: this.stage.height() / 2 - 250,
        width: defaultRectangleProperties.width,
        height: defaultRectangleProperties.height,
        fill: defaultRectangleProperties.fill,
        stroke: defaultRectangleProperties.stroke,
        strokeWidth: defaultRectangleProperties.strokeWidth,
        draggable: defaultRectangleProperties.draggable,
        name: defaultRectangleProperties.name,
      });

      currentLayer.add(rectangle);
      currentLayer.draw();

      // Adicione a forma ao serviço
      this.shapeService.addShape(rectangle);
      // Atualize x1 e x2
      this.shapeService.emitRectangleDetails(
        rectangle.x(),
        rectangle.x() + rectangle.width(),
        rectangle.y(),
        rectangle.y() + rectangle.height(),
        rectangle.width(),
        rectangle.height(),
        false
      );
    }
  }

  addCircle(): void {
    const currentLayer = this.getCurrentLayer();
    if (currentLayer) {
      const circle = new Konva.Circle({
        x: this.stage.width() / 2,
        y: this.stage.height() / 2,
        radius: defaultCircleProperties.radius,
        fill: defaultCircleProperties.fill,
        stroke: defaultCircleProperties.stroke,
        strokeWidth: defaultCircleProperties.strokeWidth,
        draggable: defaultCircleProperties.draggable,
        name: defaultCircleProperties.name,
      });

      currentLayer.add(circle);
      currentLayer.draw();

      // Adicione a forma ao serviço
      this.shapeService.addShape(circle);
    }
  }

  addLine(): void {
    const currentLayer = this.getCurrentLayer();
    if (currentLayer) {
      const line = new Konva.Line({
        points: defaultLineProperties.points,
        stroke: defaultLineProperties.stroke,
        strokeWidth: defaultLineProperties.strokeWidth,
        draggable: defaultLineProperties.draggable,
        name: defaultLineProperties.name,
      });

      currentLayer.add(line);
      currentLayer.draw();

      // Adicione a forma ao serviço
      this.shapeService.addShape(line);
    }
  }

  addLayer(): void {
    const newLayer = new Konva.Layer();
    this.stage.add(newLayer);
    this.layers.push(newLayer);
  }

  public toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  private getCurrentLayer(): Konva.Layer | undefined {
    return this.layers[this.selectedLayerIndex];
  }
}
