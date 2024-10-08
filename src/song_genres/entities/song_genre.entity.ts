import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('song_genres')
export class SongGenres {
    @PrimaryColumn()
    song_id: number;

    @PrimaryColumn()
    genre_id: number;
}




