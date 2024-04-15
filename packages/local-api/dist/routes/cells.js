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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Make sure the cell storage file exists
    // If storage does not exist add default list of cells
    // Read storage file
    // Parse list of cells out of storage
    // Return list of cells to browser
}));
router.post('/cells', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Make sure cell storage file exists
    // If file does not exist create storage
    // Take list of cells from request obj
    // Serialize cells
    // Write cells to storage
}));
