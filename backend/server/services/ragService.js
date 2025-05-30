//backend\server\services\ragService.js
const { generateEmbedding, callLLM, findClosestEmbedding } = require('../utils/ragUtils');

const handleRagRequest = async (userPrompt) => {
    try {
        const queryEmbedding = await generateEmbedding(userPrompt);
        const closest = findClosestEmbedding(queryEmbedding);

        if (closest) {
            const retrievedContent = closest.metadata.content || "No matching content found.";

            // ** Construct the prompt for Gemini **
            const llmPrompt = `You are a pharmaceutical regulatory and compliance bot. Be professional in your response. Do not make up an answer. If you do not know, say you do not know. Include the Part, Subpart and § value whenever possible in each response. Answer the following question:

Question: ${userPrompt}
Context: ${retrievedContent}`;


            // ** Call the Flask LLM endpoint **
            const llmResponse = await callLLM(llmPrompt);

            return { response: llmResponse };
        } else {
            throw new Error("No matching content found.");
        }
    } catch (error) {
        console.error('Error in handleRagRequest:', error);
        throw error;
    }
};

module.exports = { handleRagRequest };