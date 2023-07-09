import { IPerson } from '@entity/person';
import { Edge, Node } from 'reactflow';
import { personToNode } from '@feature/person/helpers/personToNode.ts';

export const convertPersonToTree = (persons: IPerson[]): { nodes: Node[]; edges: Edge[] } => {
  const toTree = (person: IPerson) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    if (!person.children) return { nodes, edges };

    person.children.forEach((p) => {
      const sourceId = person.id.toString();
      const targetId = p.id.toString();

      const childrenData = toTree(p);
      nodes.push(personToNode(p), ...childrenData.nodes);
      edges.push(
        { id: `${sourceId}-${targetId}`, source: sourceId, target: targetId },
        ...childrenData.edges,
      );
    });
    return { nodes, edges };
  };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  persons.forEach((i) => {
    const res = toTree(i);
    const parent = personToNode(i);
    nodes.push(parent, ...res.nodes);
    edges.push(...res.edges);
  });

  return { nodes, edges };
};
