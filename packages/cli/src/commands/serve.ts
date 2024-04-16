import { Command } from 'commander';
import { serve } from '@simple-codebook/local-api';
import path from 'path';

interface LocalApiError {
    code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
    .command('serve [filename]') // square brackets indicate an optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run serve on', '4005') // angled brackets indicate a required value
    .action(async (filename = 'codebook.js', options: { port: string }) => {
        const isLocalApiError = (error: any): error is LocalApiError => {
            return typeof error.code === 'string';
        }

        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
            console.log(`

        Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file

            `);
        } catch (error) {
            if (isLocalApiError(error)) {
                if (error.code ==='EADDRINUSE') {
                    console.log(`

        Port is in use. Try running on a different port e.g. "node index.js serve -p 5009"

                    `);
                }
            } else if (error instanceof Error) {
                console.log(`

        Encountered error: ${error.message}
        
                `);
            }
            process.exit(1);
        };
    });
