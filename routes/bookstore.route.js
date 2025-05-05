"use strict";
const express = require('express');
const https = require('https');
const router = express.Router();

const GOOGLE_API_KEY = 'YOUR_API_KEY';

router.get('/nearby-bookstores', function(req, res) {
    const lat = req.query.lat;
    const lng = req.query.lng;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=10000&keyword=bookstore&key=' + GOOGLE_API_KEY;

    console.log('Request URL:', url);

    https.get(url, function(apiResponse) {
        let data = '';

        apiResponse.on('data', function(chunk) {
            data += chunk;
        });

        apiResponse.on('end', function() {
            try {
                const jsonData = JSON.parse(data);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing Google Places API response:', error);
                res.status(500).json({ error: 'Failed to parse Google Places API response' });
            }
        });

        apiResponse.on('error', function(error) {
            console.error('Error fetching from Google Places API:', error);
            res.status(500).json({ error: 'Failed to fetch bookstores from Google' });
        });
    }).on('error', function(error) {
        console.error('Error making HTTPS request:', error);
        res.status(500).json({ error: 'Error making HTTPS request to Google' });
    });
});

module.exports = router;