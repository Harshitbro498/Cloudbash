const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/fetch-words', async (req, res) => {
  const { url, topN } = req.body;

  try {
    // Launch Puppeteer in headless mode with optimized settings
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set up request interception to block images, stylesheets, and fonts
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font', 'script'].includes(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });

    // Navigate to the provided URL
    await page.goto(url, { waitUntil: 'networkidle2' }); // Reduced waiting time

    // Extract the page content using Puppeteer
    const text = await page.evaluate(() => document.body.innerText);

    await browser.close();  // Close Puppeteer browser after extraction

    // Count word frequencies
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    // Sort by frequency and get top N words
    const topWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topN)
      .map(([word, count]) => ({ word, count }));

    res.json(topWords);

  } catch (error) {
    console.error('Error fetching or processing the URL:', error.message);
    res.status(500).json({ error: 'Failed to fetch and process the page content.' });
  }
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
