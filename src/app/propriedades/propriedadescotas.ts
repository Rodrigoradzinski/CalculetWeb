export interface DimensionProps {
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  align: string;
  draggable: boolean;

  lineColor: string;
  strokeWidth: number;
  sides: number;
  radius: number;
  rotationStartVertical: number;
  rotationEndVertical: number;
  rotationStartHorizontal: number;
  rotationEndHorizontal: number;
  ofssetcotas: number;
  ofssetlegendas: number;
}

export const defaultDimensionProps: DimensionProps = {
  fontSize: 20,
  fontFamily: 'Arial',
  fontColor: 'black',
  align: 'center',
  draggable: true,

  lineColor: 'black',
  strokeWidth: 2,
  sides: 2,
  radius: 5,
  rotationStartVertical: 90,
  rotationEndVertical: 90,
  rotationStartHorizontal: 180,
  rotationEndHorizontal: 180,
  ofssetcotas: 20,
  ofssetlegendas: 20,
};
