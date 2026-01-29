import express from 'express';
import personRoute from './routes/api/person/person.js';
import artistRoute from './routes/api/artist/artist.js';
import docRoutes from './routes/docs/docs.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/docs');
});
app.use('/docs', docRoutes);
app.use('/api/person', personRoute);
app.use('/api/artist', artistRoute);

export default app;