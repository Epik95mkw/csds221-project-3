import { Router } from 'express';
import mongoose from 'mongoose';
import Game from './models.js';

const router = Router();
const connectMongo = async () => mongoose.connect(process.env.DBSTRING);

const err = (res, msg) => res.status(400).json({ error: msg });

// Games

async function createGame(req, res) {
    if (!req.body || !req.body.name) { err(res, 'Missing game name'); return; }

    await connectMongo();
    const newGame = new Game({ name: req.body.name, records: [] });
    await newGame.save();
    res.status(200).json(newGame);
}
router.post('/game', createGame);


async function updateGame(req, res) {
    if (!req.params.id)              { err(res, 'Missing game id');   return; }
    if (!req.body || !req.body.name) { err(res, 'Missing game name'); return; }

    await connectMongo();
	const game = await Game.findById(req.params.id);
    game.name = req.body.name;
    await game.save();
    res.status(200).json(game);
}
router.put('/game/:id', updateGame);


async function deleteGame(req, res) {
    if (!req.params.id) { err(res, 'Missing game id'); return; }

    await connectMongo();
	const game = await Game.findByIdAndDelete(req.params.id);
    res.status(200).json(game);
}
router.delete('/game/:id', deleteGame);


async function getGameById(req, res) {
    if (!req.params.id) { err(res, 'Missing game id'); return; }

    await connectMongo();
	const game = await Game.findById(req.params.id);
    res.status(200).json(game);
}
router.get('/game/:id', getGameById);


async function getGames(req, res) {
    await connectMongo();
    const games = await Game.find({});
    res.status(200).json(games);
}
router.get('/games', getGames);


// Records

async function addRecord(req, res) {
    if (!req.params.gid)              { err(res, 'Missing game id');      return; }
    if (!req.body || !req.body.setby) { err(res, 'Missing record owner'); return; }
    if (!req.body.time)               { err(res, 'Missing record time');  return; }
    if (!req.body.date)               { err(res, 'Missing record date');  return; }

    await connectMongo();
    const game = await Game.findById(req.params.gid);
    game.records.push({
        setby: req.body.setby,
        time:  req.body.time,
        date:  req.body.date
    })
    await game.save();
    res.status(200).json(game);
}
router.post('/game/:gid/record', addRecord);


async function updateRecord(req, res) {
    
}


async function deleteRecord(req, res) {
    if (!req.params.gid) { err(res, 'Missing game id');   return; }
    if (!req.params.rid) { err(res, 'Missing record id'); return; }

    await connectMongo();
	const game = await Game.findById(req.params.gid);
    game.records.id(req.params.rid).deleteOne();
    res.status(200).json(game);
}
router.delete('/game/:gid/record/:rid', deleteRecord);


async function getRecords(req, res) {
    if (!req.params.gid) { err(res, 'Missing game id'); return; }

    await connectMongo();
	const game = await Game.findById(req.params.gid);
    res.status(200).json(game.records);
}
router.get('/game/:gid/records', getRecords);


export default router;
