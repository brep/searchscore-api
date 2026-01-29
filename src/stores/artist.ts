interface Artist {
    name: string;
}

/** 
 * ArtistStore: in-memory store of Artist objects
*/
class ArtistStore {

    private artists: Record<string, any>

    constructor() {
        // Q: what if artist in 2 different genres? duplicate?
        this.artists = {
            "rock": [
                {"name": "Led Zeppelin" },
                {"name": "AC/DC" },
                {"name": "Rolling Stones" }
            ],
            "country": [
                {"name": "Alabama" },
                {"name": "Rascal Flatts" }
            ],
            "classical": [
                {"name": "Mozart" },
                {"name": "Bach" },
                {"name": "Chopin" }
            ],
            "jazz": [
                {"name": "Miles Davis Quintet" },
                {"name": "Duke Ellington" },
                {"name": "Louis Armstrong" }
            ],
            "ska": [
                {"name": "Sublime" },
                {"name": "Reel Big Fish" },
                {"name": "The Mighty Mighty Bosstones" }
            ],
            "blues": [
                {"name": "John Mayer Trio" },
                {"name": "B.B. King" },
                {"name": "Eric Clapton" }
            ]
        };
    }

   /**
    * getArtistsByGenre: given one or more genres, return all Artists belonging to any of those genres (no duplicates)
    * @param genres: one genre or list of genres to search for
    * @return: an array of Artist belonging to any of the specified genres
    */
    getArtistsByGenre(...genres: string[]) : Artist[] {
        const ret = new Set<Artist>();
        genres.forEach(genre => {
            this.artists[genre.toLowerCase()]?.forEach((artist: Artist) => ret.add(artist));
        });
        return Array.from(ret);
    }
}

export default new ArtistStore();
