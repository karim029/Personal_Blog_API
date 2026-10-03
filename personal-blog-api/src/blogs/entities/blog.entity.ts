import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tag } from "../../tags/entities/tag.entity.js";


@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    category: string

    @CreateDateColumn()
    createdAt!: Date 

    @UpdateDateColumn()
    updatedAt!:Date

    @ManyToMany(()=> Tag)
    @JoinTable()
    tags: Tag[]
}
