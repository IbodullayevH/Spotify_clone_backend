import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity('Artist_Followers')
export class ArtistFollower {
    @PrimaryColumn()
    artist_id: number;

    @PrimaryColumn()
    user_id: number;

    @CreateDateColumn({ type: 'timestamp'})
    followed_at: Date
}