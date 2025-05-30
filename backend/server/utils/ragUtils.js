//backend\server\utils\ragUtils.js
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const { Storage } = require('@google-cloud/storage'); // Import the Storage class

require('dotenv').config(); 
// console.log('Environment Variables:', process.env);

console.log('Using credentials from:', process.env.APPLICATION_CREDENTIAL);
const storage = new Storage({
    keyFilename: process.env.APPLICATION_CREDENTIAL,
});

let embeddings = [];

async function generateEmbedding(text) {
    // console.log("Node.js sending:", text);
    try {
        const response = await fetch('http://localhost:5000/embed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

async function callLLM(prompt) {
    try {
        const response = await fetch('http://localhost:5000/llm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error calling LLM:', error);
        throw error;
    }
}

function findClosestEmbedding(queryEmbedding) {
    let maxSimilarity = -Infinity;
    let closestMatch = null;

    for (const item of embeddings) {
        const similarity = item.embedding.reduce((sum, val, i) => sum + val * queryEmbedding[i], 0);
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            closestMatch = item;
        }
    }

    return closestMatch;
}

async function loadEmbeddings() {
    try {
        const bucketName = process.env.BUCKET_NAME;
        const fileName = process.env.FILE_NAME;
        const file = storage.bucket(bucketName).file(fileName);

        const [exists] = await file.exists();
        // console.log(`File ${fileName} exists in ${bucketName}.`);
        if (exists) {
            
            const [buffer] = await file.download();
            // console.log('Inside buffer');
            const fileContent = buffer.toString('utf8');
            // console.log('file content');
            embeddings = JSON.parse(fileContent);
            // console.log(embeddings);
            console.log('Embeddings loaded successfully from GCS.');
        } else {
            // console.log(`File ${fileName} does not exist in ${bucketName}.`);
        }
    } catch (error) {
        console.error('Error loading embeddings:', error);
    }
}

module.exports = {
    generateEmbedding,
    callLLM,
    findClosestEmbedding,
    loadEmbeddings,
};