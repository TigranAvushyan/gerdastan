import { FC, useMemo } from 'react';
import { usePersonTree } from '@entity/person';
import { Tree } from '@entity/tree';
import { ReactFlowProvider } from 'reactflow';
import { PersonTreeNode } from '@feature/person/ui/node/PersonTreeNode.tsx';

export const PersonTree: FC = () => {
  const { tree } = usePersonTree();

  const nodeTypes = useMemo(() => {
    return { person: PersonTreeNode };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Tree nodeTypes={nodeTypes} nodes={tree.nodes} edges={tree.edges} />
      </ReactFlowProvider>
    </div>
  );
};
