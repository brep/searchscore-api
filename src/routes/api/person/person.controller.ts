import type { Request, Response } from 'express';
import personStore, { type Person } from '../../../stores/person.js';
import artistStore from "../../../stores/artist.js";

interface PersonSearchResult {
    person: Person;
    matches: string[];
}

interface ScoredPersonSearchResult {
    name: string;
    score: number;
    matches: string[];
}

/**
 * search: find people whose string | string[] properties include the query string
 * @param query: string to search for
 * @return sorted array of ScoredPersonSearchResult, sorted first by descending score, then ascending name
 */
export const search = (req: Request, res: Response) : void => {
  if (typeof req.query.query !== 'string' || req.query.query.trim() === '')
    throw new Error('expected single "query" parameter, e.g. ?query=eddy');

  // TODO: can improve calling trim() twice, just makes code nicer
  const query = req.query.query.toLowerCase().trim();
  const people = personStore.getPeople();
  let searchResults = searchCore(query, people);

  // compute score
  const sortedScoredResults: ScoredPersonSearchResult[] = searchResults.map(result => ({
    name: result.person.name,
    score: computeScore(result),
    matches: result.matches
  })).sort((a, b) => {
    // sort descending by score, then ascending by name
    let diff = b.score - a.score;
    if (diff !== 0) 
      return diff;
    return a.name.localeCompare(b.name);
  });

  res.json(sortedScoredResults);
};

/**
 * searchCore: find people whose string | string[] properties include the query string, as well as whos musicGenre contains an artist matching the query
 * @param query: string to search for
 * @param people: array of Person objects to search within
 * @return {PersonSearchResult[]} array of PersonSearchResult objects
 */
function searchCore(query: string, people: Person[]) : PersonSearchResult[] {
  let filtered: PersonSearchResult[] = [];

  for (let person of people) {

    let matches: string[] = [];
    for (let key of (Object.keys(person) as (keyof Person)[])) {

      let value = person[key];
      if (typeof value === 'string')
        value = [value];

      if (!Array.isArray(value))
        continue;

      // future proofing in case Person gets non-string array properties, skip over them for the search query
      let arr = value as unknown[];
      if (!arr.every(v => typeof v === 'string'))
        continue;
      
      let match = value.find(v => v.toLowerCase().includes(query));
      if (match)
        matches.push(key);
    }

    // check query match on artists within person's musicGenre
    if (person.musicGenre) {
      const artists = artistStore.getArtistsByGenre(...person.musicGenre);
      const matchingArtist = artists.find(artist => artist.toLowerCase().includes(query));
      if (matchingArtist)
        matches.push('artists');
    }

    if (matches.length > 0) {
      filtered.push({
        person: person,
        matches: matches
      });
    }
  }

  return filtered;
}

/**
 * computeScore: compute score for a PersonSearchResult based on which properties matched
 * @param personSearchResult: PersonSearchResult to compute score for
 * @return {number} score for the PersonSearchResult
 */
function computeScore(personSearchResult: PersonSearchResult) : number {
  // TODO: can be improved: if the names of any of these properties are ever changed, have to remember to update here too
  const scoreWeights: { [key: string]: number } = {
    name: 4,
    artists: 2,
    movies: 1,
    location: 1,
    musicGenre: 1
  };
  let score = 0;
  for (let match of personSearchResult.matches) {
    score += scoreWeights[match] || 0;
  }
  return score;
}