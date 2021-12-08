import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from './Car';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({
    name: 'car_id',
  })
  car: Car;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };
