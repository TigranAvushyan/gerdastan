import { FC, useEffect } from 'react';
import { ReactFlow, ReactFlowProps, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { elkOptions, getLayoutedElements } from '@entity/tree/model/getLayoutedElements.ts';

type Props = ReactFlowProps;

export const Tree: FC<Props> = ({ nodes: initialNodes, edges: initialEdges, ...props }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  useEffect(() => {
    const opts = { ...elkOptions };
    getLayoutedElements(initialNodes, initialEdges, opts).then(
      ({ nodes: layoutedNodes, edges: layoutedEdges }: any) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        fitView();
      },
    );
  }, [fitView, initialEdges, initialNodes, setEdges, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      {...props}
    ></ReactFlow>
  );
};
