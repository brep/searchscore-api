/** 
 * TODO: Note: if we wanted to keep the "display names" of the artists,
 * we could make this set use a Map<string, string> where the key is the lowercased name, value is the display name,
 * or if we wanted to make artist more complex (e.g. add Albumns) it would be Map<string, Artist>
 */
class ArtistSet extends Set<string> {
    constructor(artists?: string[]) {
        artists = artists?.map(artist => artist.toLowerCase());
        super(artists);
    }
    add(value: string): this {
        return super.add(value.toLowerCase());
    }
}

/** 
 * ArtistStore: in-memory store of Artist objects
*/
class ArtistStore {

    private artists: Record<string, ArtistSet>

    constructor() {
        // Q: what if artist in 2 different genres? duplicate?
        this.artists = {
            "rock": new ArtistSet([
                "Led Zeppelin",
                "AC/DC",
                "Rolling Stones"
            ]),
            "country": new ArtistSet([
                "Alabama",
                "Rascal Flatts"
            ]),
            "classical": new ArtistSet([
                "Mozart",
                "Bach",
                "Chopin"
            ]),
            "jazz": new ArtistSet([
                "Miles Davis Quintet",
                "Duke Ellington",
                "Louis Armstrong"
            ]),
            "ska": new ArtistSet([
                "Sublime",
                "Reel Big Fish",
                "The Mighty Mighty Bosstones"
            ]),
            "blues": new ArtistSet([
                "John Mayer Trio",
                "B.B. King",
                "Eric Clapton"
            ])
        };
    }

   /**
    * getArtistsByGenre: given one or more genres, return all Artists belonging to any of those genres (no duplicates)
    * @param genres: one genre or list of genres to search for
    * @return: an array of Artist belonging to any of the specified genres
    */
    getArtistsByGenre(...genres: string[]) : string[] {
        const ret = new Set<string>();
        genres.forEach(genre => {
            this.artists[genre.toLowerCase()]?.forEach((artist: string) => ret.add(artist));
        });
        return Array.from(ret);
    }

   /**
    * add: adds an artist to a genre, ignoring duplicates
    * @param genre: genre to add the artist to
    * @param artistName: artist name to add
    */
    add(genre: string, artistName: string) : boolean {
        const genreKey = genre.toLowerCase();
        if (!this.artists[genreKey])
            this.artists[genreKey] = new ArtistSet();
        let set = this.artists[genreKey];
        let prevSize = set.size;
        set.add(artistName);
        return (prevSize !== set.size);
    }
}

export default new ArtistStore();
