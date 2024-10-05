import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('Playlist_songs')
export class PlaylistSong {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playlist_id: number;

    @Column()
    song_id: number
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    added_at: Date
}