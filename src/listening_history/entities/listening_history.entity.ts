import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('Listening_history')
export class ListeningHistory{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    song_id: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    listened_at: Date
}