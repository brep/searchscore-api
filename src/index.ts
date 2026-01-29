import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Search Score API listening on port ${PORT}!`)
});

export default app;