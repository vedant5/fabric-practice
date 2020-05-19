import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShapeService } from '../shape.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  canvas: fabric.Canvas;

  counter1 ;
  counter2 ;
  jsonArray = [];
  selectedColor = 'Thistle';
  xDim = 1050;
  yDim = 500;

  constructor(private shapeService: ShapeService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas-container', {
      backgroundColor: this.selectedColor,
      isDrawingMode: false,
    });

    this.canvas.setHeight(this.yDim);
    this.canvas.setWidth(this.xDim);
    this.counter1 = 0;
    this.counter2 = 0;
  }

  togglePen() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
  }

  changeCanvasColor(canvasColor) {
    this.canvas.backgroundColor = canvasColor;
  }

  changeCanvasSize(x, y) {
    this.canvas.setWidth(x);
    this.canvas.setHeight(y);
  }

  reset() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
      this.canvas.backgroundColor = this.selectedColor;
      this.canvas.setHeight(this.yDim);
      this.canvas.setWidth(this.xDim);
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
    }
  }

  circle() {
    this.canvas.add(
      new fabric.Circle({
        radius: 50,
        fill: 'green',
        left: 10,
        top: 10,
        opacity: 0.8,
      })
    );
  }

  line() {
    this.canvas.add(new fabric.Canvas('arrow'));
  }

  box() {
    this.canvas.add(
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: 'red',
        opacity: 0.8,
        left: 10,
        top: 10,
      })
    );
  }

  triangle() {
    this.canvas.add(
      new fabric.Triangle({
        width: 80,
        height: 80,
        fill: 'lightblue',
        left: 10,
        top: 10,
      })
    );
  }

  textBox() {
    this.canvas.add(
      new fabric.Textbox('MyText', {
        width: 150,
        top: 5,
        left: 5,
        fontSize: 16,
        textAlign: 'center',
        fixedWidth: 150,
      })
    );
  }

  deleteObjects() {
    var activeObject = this.canvas.getActiveObjects();
    console.log(activeObject);
    if (activeObject) {
      if (confirm('Are you sure?')) {
        activeObject.forEach((object) => {
          this.canvas.remove(object);
        });
        this.canvas.discardActiveObject();
      }
    }
  }

  canvasToJson() {
    this.jsonArray.push(JSON.stringify(this.canvas));
    this.counter1 = this.jsonArray.length;
    this.counter2 = this.counter1;
    console.log(JSON.stringify(this.canvas))
  }

  loadJson() {
    var x = this.counter2;
    this.counter2--;
    this.finalLoadScreen(x-1);
  }

  finalLoadScreen(pos){
    this.canvas.loadFromJSON(
      this.jsonArray[pos],
      this.canvas.renderAll.bind(this.canvas)
      // function (o, object) {
      //   fabric.log(o, object);
      // }
    );
  }
}
