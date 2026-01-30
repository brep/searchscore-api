import artistStore from "../../../stores/artist.js";
import type { Request, Response } from "express";

/**
 * add: adds an artist in genre to the artist store. artist names are unique per genre.
 * @param genre the genre the artist belongs to TODO: if we want to support multiple genres in one request, can change to an array[]
 * @param name the name of the artist
 * @param res 201 if successfully created, 409 if duplicate exists 
 */
export const add = (req: Request<{ genre: string; name: string }>, res: Response) : void => {
  let { genre, name } = req.body;
  if (!genre || !name)
    throw new Error("Invalid arguments: expected body { genre: string, name: string }");
  // TODO: see if there is a better way to automatically enforce request body signature without having to manually check
  if (typeof(genre) !== 'string' || typeof(name) !== 'string')
    throw new Error("Invalid arguments: expected body { genre: string, name: string }");
  
  let trimmedGenre = genre.trim();
  let trimmedName = name.trim();
  if (trimmedGenre === '' || trimmedName === '')
    throw new Error("Invalid arguments: expected non-empty strings");

  if (artistStore.add(trimmedGenre, trimmedName))
    res.status(201).send();
  else
    res.status(409).send();
};