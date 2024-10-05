import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"; 

@Entity('playlists')
export class Playlist {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
created_at: Date


@ManyToOne(() => User, (user) => user.playlists)
user: User
}

