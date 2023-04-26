import { Schema, model } from 'mongoose';

const recordModel = new Schema({
    holder: String,
    time: String
})

const gameModel = new Schema({
    name: String,
    records: [recordModel]
});

const Game = model('Game', gameModel);

export default Game;