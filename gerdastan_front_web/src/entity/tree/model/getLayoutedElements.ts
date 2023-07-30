import ELK from 'elkjs/lib/elk.bundled';
import { Edge, Node } from 'reactflow';

const elk = new ELK();

export const elkOptions = {
  'elk.algorithm': 'mrtree',
  'elk.direction': 'DOWN',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

export const getLayoutedElements = (nodes?: Node[], edges?: Edge[], options: any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph: any = {
    id: 'root',
    layoutOptions: options,
    children: nodes?.map((node) => ({
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children?.map((node) => ({
        ...node,
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};
