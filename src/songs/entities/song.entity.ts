import { Album } from "src/albums/entities/album.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";

@Entity('Songs')
export class Song {
@PrimaryGeneratedColumn()
id: number

@Column()
title: string

@Column({ type: 'int', nullable: true })
duration: number

@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date 

@ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE'})
album: Album
}