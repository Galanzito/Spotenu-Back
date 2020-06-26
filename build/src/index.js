"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsersRouter_1 = require("./router/UsersRouter");
const cors_1 = __importDefault(require("cors"));
const MusicalGenresRouter_1 = require("./router/MusicalGenresRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/users", UsersRouter_1.usersRouter);
app.use("/genres", MusicalGenresRouter_1.musicalGenresRouter);
exports.default = app;
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
