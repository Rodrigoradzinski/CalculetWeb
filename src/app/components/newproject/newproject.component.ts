import { UpdatequotesService } from './../../services/serviceshapes/updatequotes.service';
import { TransformershapesService } from '../../services/serviceshapes/transformershapes.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Konva from 'konva';
import { OrganizeShapesService } from 'src/app/services/serviceshapes/organizeshapes.service';
import { ShapeService } from 'src/app/services/serviceshapes/shape.service';
import { MenuRigthButtonNewprojectComponent } from '../menu-rigth-button-newproject/menu-rigth-button-newproject.component';
import * as MakerJs from 'makerjs';
import { IModel } from 'makerjs';
import { Circle } from 'konva/lib/shapes/Circle';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],
})
export class NewprojectComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild(MenuRigthButtonNewprojectComponent)
  contextMenu!: MenuRigthButtonNewprojectComponent;
  private stage!: Konva.Stage;
  private layer!: Konva.Layer;
  private readonly GUIDELINE_OFFSET = 5;
  selectedShape: Konva.Shape | null = null;
  constructor(
    private shapeService: ShapeService,
    private TransformershapesService: TransformershapesService,
    private organizeShapesService: OrganizeShapesService
  ) {}

  ngAfterViewInit() {
    const width = this.container.nativeElement.offsetWidth;
    const height = this.container.nativeElement.offsetHeight;
    //this.container.nativeElement.offsetHeight;
    this.stage = new Konva.Stage({
      container: this.container.nativeElement,
      width: width,
      height: height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.setupLayerEvents(); // Agora chamamos a função setupLayerEvents
    this.layer.draw();

    const handleClickOutside = () => {
      this.TransformershapesService.removeTransformer();
      this.TransformershapesService.removeRotationText();
      this.layer.draw();
    };

    //chama transformershapes.service.ts para remover selecao
    this.stage.on('click', (e) => {
      // Check if the target of the click event is the stage itself
      if (e.target === this.stage) {
        handleClickOutside();
      }
    });

    //chama serviço para criar shapes
    this.shapeService.shapes$.subscribe((shapes) => {
      shapes.forEach((shape) => {
        this.layer.add(shape);
      });
      this.layer.draw();
    });
    //chama transformershapes.service.ts para selecao de objetos
    this.shapeService.shapes$.subscribe((shapes: any[]) => {
      if (shapes) {
        shapes.forEach((shape) => {
          this.layer.add(shape);

          shape.on('click', () => {
            this.TransformershapesService.attachTransformer(this.layer, shape);

            this.organizeShapesService.setSelectedShape(shape);
          });
        });
        this.layer.draw();
      }
    });
  }
  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenu.openMenu(event);
  }
  private getLineGuideStops(skipShape: Konva.Shape): {
    vertical: number[];
    horizontal: number[];
  } {
    // we can snap to stage borders and the center of the stage
    let vertical = [0, this.stage.width() / 2, this.stage.width()];
    let horizontal = [0, this.stage.height() / 2, this.stage.height()];

    // and we snap over edges and center of each object on the canvas
    this.stage.find('.object').forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      let box = guideItem.getClientRect();
      // and we can snap to all edges of shapes
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
      vertical: vertical,
      horizontal: horizontal,
    };
  }
  private getObjectSnappingEdges(node: Konva.Node): {
    vertical: object[];
    horizontal: object[];
  } {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: 'start',
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: 'end',
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: 'start',
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: 'center',
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: 'end',
        },
      ],
    };
  }
  private getGuides(
    lineGuideStops: { vertical: number[]; horizontal: number[] },
    itemBounds: { vertical: object[]; horizontal: object[] }
  ): any[] {
    let resultV: any[] = [];
    let resultH: any[] = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound: any) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        // if the distance between guild line and object snap point is close we can consider this for snapping
        if (diff < this.GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    // do the same for horizontal lines
    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound: any) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < this.GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    let guides = [];

    // find closest snap
    let minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    let minH = resultH.sort((a, b) => a.diff - b.diff)[0];

    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: 'V',
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: 'H',
        snap: minH.snap,
      });
    }

    return guides;
  }
  private drawGuides(guides: any[]): void {
    guides.forEach((lg) => {
      let line: Konva.Line;

      if (lg.orientation === 'H') {
        line = new Konva.Line({
          points: [-6000, 0, 6000, 0],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 0.5,
          name: 'guid-line',
          dash: [3, 3],
        });

        this.layer.add(line);
        line.absolutePosition({
          x: 0,
          y: lg.lineGuide,
        });
      } else if (lg.orientation === 'V') {
        line = new Konva.Line({
          points: [0, -6000, 0, 6000],
          stroke: 'rgb(0, 161, 255)',
          strokeWidth: 0.5,
          name: 'guid-line',
          dash: [3, 3],
        });

        this.layer.add(line);
        line.absolutePosition({
          x: lg.lineGuide,
          y: 0,
        });
      }
    });
  }
  private setupLayerEvents(): void {
    this.layer.on('dragmove', (e: Konva.KonvaEventObject<DragEvent>) => {
      // clear all previous lines on the screen
      this.layer.find('.guid-line').forEach((l) => l.destroy());

      // find possible snapping lines
      const lineGuideStops = this.getLineGuideStops(e.target as Konva.Shape);
      // find snapping points of current object
      const itemBounds = this.getObjectSnappingEdges(e.target as Konva.Node);

      // now find where can we snap current object
      const guides = this.getGuides(lineGuideStops, itemBounds);

      // do nothing of no snapping
      if (!guides.length) {
        return;
      }

      this.drawGuides(guides);

      const absPos = e.target.absolutePosition();
      // now force object position
      guides.forEach((lg) => {
        switch (lg.snap) {
          case 'start':
          case 'center':
          case 'end': {
            switch (lg.orientation) {
              case 'V': {
                absPos.x = lg.lineGuide + lg.offset;
                break;
              }
              case 'H': {
                absPos.y = lg.lineGuide + lg.offset;
                break;
              }
            }
            break;
          }
        }
      });
      e.target.absolutePosition(absPos);
    });

    this.layer.on('dragend', (e: Konva.KonvaEventObject<DragEvent>) => {
      // clear all previous lines on the screen
      this.layer.find('.guid-line').forEach((l) => l.destroy());
    });
  }

  exportDXF() {
    const model: IModel = { models: {} };
    console.log('Model before exporting:', JSON.stringify(model, null, 2));
    const children = this.layer.getChildren(); // Sem .toArray()

    console.log('Total children:', children.length); // Isso deve mostrar o número total de objetos
    children.forEach((shape: any) => {
      console.log('Processing shape:', shape.className); // Isso deve logar o tipo de cada forma
    });

    children.forEach((shape: any) => {
      console.log('Processing shape:', shape.className); // Debug log
      if (shape instanceof Konva.Rect) {
        const rectangle = new MakerJs.models.Rectangle(
          shape.width(),
          shape.height()
        );
        MakerJs.model.move(rectangle, [shape.x(), shape.y()]);
        model.models![`${shape.id()}_rectangle`] = rectangle;
      }

      if (shape.className === 'Circle') {
        const scaleX = shape.scaleX();
        const scaleY = shape.scaleY();
        const originalRadius = shape.radius();
        const radiusX = originalRadius * scaleX;
        const radiusY = originalRadius * scaleY;

        if (scaleX === 1 && scaleY === 1) {
          console.log('É um círculo (não foi escalado)');
          const circle = new MakerJs.models.Holes(shape.radius(), [
            [shape.x(), shape.y()],
          ]);
          MakerJs.model.move(circle, [shape.x(), shape.y()]);
          model.models![`${shape.id()}_circle`] = circle;
        } else if (scaleX !== scaleY) {
          const ellipse = new MakerJs.models.Ellipse(radiusX, radiusY);
          MakerJs.model.move(ellipse, [shape.x(), shape.y()]);
          model.models![`${shape.id()}_ellipse`] = ellipse;
          //const circle = new MakerJs.models.Oval(shape.x(), shape.y()); // Use Oval para criar furos elípticos
          console.log('É uma elipse (foi escalado de forma não uniforme)');
        } else {
          console.log('É um círculo ');
          const circle = new MakerJs.models.Holes(shape.radius(), [
            [shape.x(), shape.y()],
          ]);
          MakerJs.model.move(circle, [shape.x(), shape.y()]);
          model.models![`${shape.id()}_circle`] = circle;
        }
      }

      // Adicione mais condições para outras formas como linha, elipse, etc.
    });

    // Exporte o modelo para DXF
    const dxf = MakerJs.exporter.toDXF(model);

    // Crie um Blob a partir da string DXF
    const blob = new Blob([dxf], { type: 'application/dxf' });

    // Crie uma URL para o Blob
    const url = window.URL.createObjectURL(blob);

    // Crie um elemento de link temporário
    const a = document.createElement('a');

    // Defina os atributos href e download para o link
    a.href = url;
    a.download = 'drawing.dxf'; // Nome do arquivo DXF

    // Adicione o link ao DOM
    document.body.appendChild(a);

    // Simula um clique no link para iniciar o download
    a.click();

    // Remove o link do DOM
    document.body.removeChild(a);

    // Libera a URL do Blob
    window.URL.revokeObjectURL(url);
  }
}
