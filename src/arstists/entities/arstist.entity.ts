import { Album } from "src/albums/entities/album.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
@Entity('Artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio: string

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @OneToMany(() => Album, album => album.artist)
    albums: Album[]
}