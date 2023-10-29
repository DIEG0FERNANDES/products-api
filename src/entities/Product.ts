import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    description: string

    @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column({ nullable: false })
    quantity: number
}
