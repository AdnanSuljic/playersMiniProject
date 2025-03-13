import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  tableID: number;

  @Column()
  playerName: string;

  @Column()
  numberOfGoals: number;

  @Column()
  numberOfAppearances: number;

  @Column()
  nationalTeam: string;
}