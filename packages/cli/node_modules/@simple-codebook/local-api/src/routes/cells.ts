import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string,
    content: string,
    type: 'text' | 'code'
}

interface LocalApiError {
    code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {
        const isLocalApiError = (error: any): error is LocalApiError => {
            return typeof error.code === 'string';
        }

        try {
            // Read the file
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

            res.send(JSON.parse(result));
        } catch (error) {
            // If read throws error, check if the error is that the file doesn't exist then create file
            if (isLocalApiError(error)) {
                if (error.code === 'ENOENT') {
                    // Add code to create a file and add default cells
                    await fs.writeFile(fullPath, '[]', 'utf-8');
                    res.send([]);
                }
            } else {
                throw error;
            }
        }
        
        // Read storage file
        // Parse list of cells out of storage
        // Return list of cells to browser
    });

    router.post('/cells', async (req, res) => {
        // fs will create the storage for us if it does not exist

        // Take list of cells from request obj and serialize cells
        const { cells }: { cells: Cell[] } = req.body;

        // Write cells to storage
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

        res.send({ status: 'ok' });
    });

    return router;
};