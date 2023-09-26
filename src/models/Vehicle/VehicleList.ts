import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CVehicle_List_TM')
export class VehicleListTM {
  @PrimaryGeneratedColumn()
  VehicleId!: number;

  @Column({ type: 'varchar', length: 17, unique: true })
  VIN!: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  LicensePlate!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  EngineNo!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  STNKName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  STNKAddress!: string;

  @Column({ type: 'date', nullable: true })
  STNKDate!: Date | null;
}
