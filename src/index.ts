import express from 'express';
import coreRoutes from './routes/core/core.js';
import docRoutes from './routes/docs/docs.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', coreRoutes);
app.use('/docs', docRoutes);

app.listen(PORT, () => {
  console.log(`Search Score API listening on port ${PORT}!`)
});

export default app;