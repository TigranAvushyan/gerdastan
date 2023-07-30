import { IPerson } from '@entity/person';
import { Node } from 'reactflow';
import { IPersonNodeData } from '@feature/person/types/personTypes.ts';
import { getFullName } from '@entity/person/helpers/getFullName.ts';

export const personToNode = (person: IPerson): Node<IPersonNodeData> => {
  return {
    id: person.id.toString(),
    type: 'person',
    data: {
      label: getFullName(person),
      ...person,
      children: person.children?.map((i) => i.id),
    },
    position: { x: 0, y: 0 },
  };
};
