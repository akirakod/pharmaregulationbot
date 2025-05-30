//backend\server\routes\rag.js
const express = require('express');
const router = express.Router();
const ragService = require('../services/ragService');

router.post('/', async (req, res) => {
    try {
        const result = await ragService.handleRagRequest(req.body.prompt);
        res.json(result);
    } catch (error) {
        console.error('Error in /api/rag:', error);
        res.status(500).json({ error: 'Error processing the request.' });
    }
});

module.exports = router;