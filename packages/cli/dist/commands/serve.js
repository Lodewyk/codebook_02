"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
const local_api_1 = require("@simple-codebook/local-api");
const path_1 = __importDefault(require("path"));
const isProduction = process.env.NODE_ENV === 'production';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]') // square brackets indicate an optional value
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run serve on', '4005') // angled brackets indicate a required value
    .action((filename = 'codebook.js', options) => __awaiter(void 0, void 0, void 0, function* () {
    const isLocalApiError = (error) => {
        return typeof error.code === 'string';
    };
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`

        Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file

            `);
    }
    catch (error) {
        if (isLocalApiError(error)) {
            if (error.code === 'EADDRINUSE') {
                console.log(`

        Port is in use. Try running on a different port e.g. "node index.js serve -p 5009"

                    `);
            }
        }
        else if (error instanceof Error) {
            console.log(`

        Encountered error: ${error.message}
        
                `);
        }
        process.exit(1);
    }
    ;
}));
