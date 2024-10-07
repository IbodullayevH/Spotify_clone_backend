import { AlbumsGenres } from "src/albums_genres/entities/albums_genre.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('Genres')
export class Genre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: false})
    name: string;

    @OneToMany(() => AlbumsGenres, (albumsGenres)=> albumsGenres.genre)
    albumsGenre: AlbumsGenres[]
}