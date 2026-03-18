const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const things = [
  'A rusted key', 'A broken compass', 'A faded photograph', 'A cracked mirror',
  'An old music box', 'A torn letter', 'A glass eye', 'A golden locket',
  'A weathered map', 'A single glove',
];

const places = [
  'An abandoned lighthouse', 'A flooded basement', 'A rooftop garden',
  'A midnight train', 'A crumbling cathedral', 'A frozen lake',
  'A sunken ship', 'A forgotten library', 'A burning field', 'A mountain pass',
];

const emotions = [
  'Longing', 'Dread', 'Euphoria', 'Regret', 'Wonder',
  'Jealousy', 'Relief', 'Guilt', 'Hope', 'Despair',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

app.get('/api/prompt', (req, res) => {
  res.json({
    Thing: pick(things),
    Place: pick(places),
    Emotion: pick(emotions),
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { app, things, places, emotions };
