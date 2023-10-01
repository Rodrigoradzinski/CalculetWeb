import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { OrganizeShapesService } from 'src/app/services/serviceshapes/organizeshapes.service';

@Component({
  selector: 'app-menu-rigth-button-newproject',
  templateUrl: './menu-rigth-button-newproject.component.html',
  styleUrls: ['./menu-rigth-button-newproject.component.css'],
})
export class MenuRigthButtonNewprojectComponent {
  menuElement!: HTMLElement;
  showRightMenu = false;
  menuTop = 0;
  menuLeft = 0;

  constructor(
    private organizeShapesService: OrganizeShapesService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.menuElement =
      this.elementRef.nativeElement.querySelector('#menu-rigth-button');
  }

  openMenu(event: MouseEvent) {
    event.preventDefault();
    this.menuTop = event.clientY;
    this.menuLeft = event.clientX;
    this.showRightMenu = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    console.log('Document click');
    const isClickedInside = this.isClickedInsideMenu(event);

    if (!isClickedInside) {
      this.showRightMenu = false;
    }
  }

  isClickedInsideMenu(event: MouseEvent): boolean {
    if (this.menuElement) {
      return this.menuElement.contains(event.target as Node);
    }
    return false;
  }

  sendShapeToBack(): void {
    this.organizeShapesService.sendToBack();
  }

  bringShapeToFront(): void {
    this.organizeShapesService.bringToFront();
  }

  sendShapeBackward(): void {
    this.organizeShapesService.sendBackward();
  }

  bringShapeForward(): void {
    this.organizeShapesService.bringForward();
  }
}
