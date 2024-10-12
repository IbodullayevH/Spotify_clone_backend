import { Album } from "src/albums/entities/album.entity";
import { Genre } from "src/genres/entities/genre.entity";
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";

@Entity('Albums_Genres')
export class AlbumsGenres {
    @PrimaryColumn()
    album_id: number;

    @PrimaryColumn()
    genre_id: number;

    @ManyToOne(() => Album, (album) => album.albumGenres, { eager: true })
    album: Album;

    @ManyToOne(() => Genre, (genre) => genre.albumsGenre, { eager: true })
    genre: Genre;
};
