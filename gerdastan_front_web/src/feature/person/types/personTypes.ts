import { IPerson } from '@entity/person';

export interface IPersonNodeData extends Omit<IPerson, 'children'> {
  label: string;
  children?: number[];
}
