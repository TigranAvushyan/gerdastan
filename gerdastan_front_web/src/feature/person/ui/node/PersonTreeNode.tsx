import { Handle, NodeProps, Position } from 'reactflow';
import { IPersonNodeData } from '@feature/person/types/personTypes.ts';
import styles from './node.module.css';
import cn from 'classnames';
import { PersonGender } from '@entity/person/types/personTypes.ts';

export const PersonTreeNode = (node: NodeProps<IPersonNodeData>) => {
  return (
    <div
      className={cn(
        styles.container,
        node.data.gender === PersonGender.MALE && styles.male,
        node.data.gender === PersonGender.FEMALE && styles.female,
      )}
    >
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
