import { FC, MouseEvent as ReactMouseEvent, useMemo } from 'react';
import { IPerson, usePersonTree } from '@entity/person';
import { Tree } from '@entity/tree';
import { ReactFlowProvider } from 'reactflow';
import { PersonTreeNode } from '@feature/person/ui/node/PersonTreeNode.tsx';
import { PersonDetailModal } from '@feature/person/ui/detail/PersonDetailModal.tsx';
import { Node } from '@reactflow/core/dist/esm/types/nodes';
import { showPersonDetail } from '@feature/person/model/personDetail.ts';
import { CreatePersonModal } from '@feature/person/ui/create-person/CreatePersonModal.tsx';
import { Button } from 'antd';
import { openCreatePersonModal } from '@entity/person/model/createPerson.ts';
import styles from './personTree.module.css';
import { fetchPersonTreeFx } from '@entity/person/model/personStore.ts';
import { useStore } from 'effector-react';
import { LoadingOutlined } from '@ant-design/icons';
export const PersonTree: FC = () => {
  const { tree } = usePersonTree();

  const nodeTypes = useMemo(() => {
    return { person: PersonTreeNode };
  }, []);

  const clickNode = (_: ReactMouseEvent, node: Node<IPerson>) => {
    showPersonDetail(node.data.id);
  };

  const loading = useStore(fetchPersonTreeFx.pending);

  if (loading)
    return (
      <div className={styles.fullScreen}>
        <LoadingOutlined />
      </div>
    );
  return (
    <div className={styles.fullScreen}>
      {tree.nodes.length ? (
        <ReactFlowProvider>
          <Tree
            deleteKeyCode={null}
            onNodeClick={clickNode}
            nodeTypes={nodeTypes}
            nodes={tree.nodes}
            edges={tree.edges}
          />
        </ReactFlowProvider>
      ) : (
        <Button type={'primary'} onClick={() => openCreatePersonModal(null)}>
          Ստեղծել գերդաստան
        </Button>
      )}
      <PersonDetailModal />
      <CreatePersonModal />
    </div>
  );
};
