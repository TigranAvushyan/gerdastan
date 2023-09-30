import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Gender } from '../../enums/Gender';

@Tree('materialized-path')
@Entity()
export abstract class PersonEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: string;

  @Column({ type: 'varchar', length: 30 })
  firstName: string;

  @Column({ type: 'varchar', length: 30 })
  lastName: string;

  @Column({ type: 'enum', nullable: true, enum: Gender })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  about: string;

  @Column({ type: 'varchar', nullable: true, length: 10 })
  birthday: string;

  @Column({ type: 'varchar', nullable: true, length: 10 })
  died: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  wifeOrHusband: string;

  @Column({ type: 'varchar', nullable: true })
  parentId: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'simple-array', nullable: true })
  videos: string[];

  @TreeParent()
  parent: PersonEntity;

  @TreeChildren()
  children: PersonEntity[];
}
