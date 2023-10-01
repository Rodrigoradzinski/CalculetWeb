export interface ShapeProperties {
  x: number;
  y: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  draggable: boolean;
  name: string;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
}

//cor padrao do vidro
const defaultColor = 'rgba(173, 216, 230, 0.5)';

//cores dos vidros

// Cor cinza (RGBA)
const grayColor = 'rgba(128, 128, 128, 1)';

// Cor bronze (RGBA)
const bronzeColor = 'rgba(205, 127, 50, 1)';

// Cor verde (RGBA)
const greenColor = 'rgba(0, 128, 0,0.4)';

// Cor Incolor (RGBA)
const incolorColor = 'rgba(161, 204, 202, 0.5)';

// Valores padrões para retângulo
export const defaultRectangleProperties: ShapeProperties = {
  width: 200,
  height: 300,
  x: 200,
  y: 400,
  fill: defaultColor,
  stroke: 'black',
  strokeWidth: 0.1,
  draggable: true,
  name: 'object',
};

// Valores padrões para círculo
export const defaultCircleProperties: ShapeProperties = {
  radius: 100,
  x: 200,
  y: 400,
  fill: defaultColor,
  stroke: 'black',
  strokeWidth: 0.1,
  draggable: true,
  name: 'object',
};

// Valores padrões para linha
export const defaultLineProperties: ShapeProperties = {
  points: [200, 200, 300, 300],
  fill: 'black', // Adicione a propriedade fill com um valor padrão
  x: 200,
  y: 400,
  stroke: 'black',
  strokeWidth: 10,
  draggable: true,
  name: 'object',
};
