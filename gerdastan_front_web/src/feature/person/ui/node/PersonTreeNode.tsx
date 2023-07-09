import { Handle, NodeProps, Position } from 'reactflow';
import { IPersonNodeData } from '@feature/person/types/personTypes.ts';
import styles from './node.module.css';

export const PersonTreeNode = (node: NodeProps<IPersonNodeData>) => {
  return (
    <div className={styles.container}>
      {node.data.parentId !== null && (
        <Handle isConnectable={false} type={'target'} position={Position.Top} />
      )}
      <div>{node.data.label}</div>
      {!!node.data.children?.length && (
        <Handle isConnectable={false} type={'source'} position={Position.Bottom} />
      )}
    </div>
  );
};
