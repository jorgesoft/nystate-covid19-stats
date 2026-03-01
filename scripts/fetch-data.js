/**
 * fetch-data.js
 *
 * Run this script ONCE to archive COVID data from the Covid Act Now API
 * before the API shuts down on March 11, 2026.
 *
 * Usage:
 *   node scripts/fetch-data.js
 *
 * Requires Node.js 18+ (built-in fetch) or install node-fetch:
 *   npm install --save-dev node-fetch   # if Node < 18
 *
 * Output:
 *   public/data/ny_current.json
 *   public/data/ny_timeseries.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = '';
const BASE_URL = 'https://api.covidactnow.org/v2';
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');

function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error(`Failed to parse JSON: ${e.message}`));
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    if (!fs.existsSync(OUT_DIR)) {
        fs.mkdirSync(OUT_DIR, { recursive: true });
    }

    console.log('Fetching current NY state data...');
    const current = await fetchJson(`${BASE_URL}/state/NY.json?apiKey=${API_KEY}`);
    const currentPath = path.join(OUT_DIR, 'ny_current.json');
    fs.writeFileSync(currentPath, JSON.stringify(current, null, 2));
    console.log(`  Saved -> ${currentPath}`);

    console.log('Fetching NY state timeseries data (may be large)...');
    const timeseries = await fetchJson(`${BASE_URL}/state/NY.timeseries.json?apiKey=${API_KEY}`);
    const timeseriesPath = path.join(OUT_DIR, 'ny_timeseries.json');
    fs.writeFileSync(timeseriesPath, JSON.stringify(timeseries, null, 2));
    console.log(`  Saved -> ${timeseriesPath}`);

    console.log('\nDone! Commit the files in public/data/ to the repository.');
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
