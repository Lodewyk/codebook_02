import express from 'express';

const router = express.Router();

router.get('/cells', async (req, res) => {
    // Make sure the cell storage file exists
        // If storage does not exist add default list of cells

    // Read storage file
    // Parse list of cells out of storage
    // Return list of cells to browser
});

router.post('/cells', async (req, res) => {
    // Make sure cell storage file exists
        // If file does not exist create storage

    // Take list of cells from request obj
    // Serialize cells
    // Write cells to storage
});