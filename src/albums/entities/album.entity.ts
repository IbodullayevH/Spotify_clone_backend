import { Artist } from "src/arstists/entities/arstist.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Song } from "src/songs/entities/song.entity";

@Entity("Albums")
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ type: 'int', nullable: true }) 
    artist_id: number;

    @Column({ type: 'date', nullable: true})
    release_date: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMPT'})
    createdAt: Date

    @ManyToOne(() => Artist, artist => artist.albums, {
        onDelete: 'CASCADE',
        nullable: false
    })

    @JoinColumn({ name: 'artist_id'})
    artist: Artist;

    @OneToMany(() => Song, song => song.album)
    songs: Song[]
}