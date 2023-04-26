import { Schema, model } from 'mongoose';

const recordModel = new Schema({
    setby: String,
    time: String,
    date: String
})

const gameModel = new Schema({
    name: String,
    records: [recordModel]
});

const Game = model('Game', gameModel);

export default Game;