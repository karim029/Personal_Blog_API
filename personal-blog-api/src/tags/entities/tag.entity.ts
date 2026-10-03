import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "../../blogs/entities/blog.entity.js";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @ManyToMany(()=> Blog)
    blogs: Blog[]

}
