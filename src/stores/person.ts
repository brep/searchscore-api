export interface Person {
    name: string;
    musicGenre: string[];
    movies: string[];
    location: string;
}

/**
 * PersonStore: in-memory store of Person objects
 */
class PersonStore {

    private people: Person[] = [];

    constructor() {
        this.people = [
            {
                "name": "Eddy Verde",
                "musicGenre": ["Rock", "Country"],
                "movies": ["Avatar", "The Good, the Bad and the Ugly"],
                "location": "Florida"
            },
            {
                "name": "Bonnie Wang",
                "musicGenre": ["Classical"],
                "movies": ["Lilo & Stitch", "Die Hard"],
                "location": "Maryland"
            },
            {
                "name": "Greta Heissenberger",
                "musicGenre": ["Jazz", "Rock"],
                "movies": ["The Departed", "M*A*S*H", "The Godfather"],
                "location": "Massachusetts"
            },
            {
                "name": "Justin Coker",
                "musicGenre": ["Country"],
                "movies": ["Raiders of the Lost Ark", "Apollo 13"],
                "location": "South Carolina"
            },
            {
                "name": "Jason Leo",
                "musicGenre": ["Rock", "Ska"],
                "movies": ["The Dark Knight", "Top Gun"],
                "location": "Maine"
            },
            {
                "name": "Doug Akridge",
                "musicGenre": ["Rock", "Blues"],
                "movies": ["Jurassic Park", "Cast Away", "Romeo + Juliet"],
                "location": "Washington, D.C."
            }
        ]

    }

    getPeople() : Person[] {
        return this.people;
    }
}

const personStore = new PersonStore()
export default personStore;
