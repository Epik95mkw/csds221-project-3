import { Router } from 'express';
import mongoose from 'mongoose';
import Game from './models.js';

const router = Router();
const connectMongo = async () => mongoose.connect(process.env.DBSTRING);

async function createGame(req, res) {
    if (!req.body || !req.body.name) {
	    res.status(400).json({ error: req.body });
	    return;
    }

    await connectMongo();
    const newGame = new Game({ name: req.body.name, records: [] });
    await newGame.save();
    res.status(200).json(newGame);
}
router.post('/game', createGame);


async function updateGame(req, res) {
    if (!req.params.id) {
		res.status(400).json({ error: 'Missing id param' });
		return;
	}
    if (!req.body || !req.body.name) {
	    res.status(400).json({ error: "Missing name param" });
	    return;
    }

    await connectMongo();
	const game = await Game.findById(req.params.id);
    game.name = req.body.name;
    await game.save();
    res.status(200).json(game);
}
router.put('/game/:id', updateGame);


async function deleteGame(req, res) {
    if (!req.params.id) {
		res.status(400).json({ error: 'Missing id param' });
		return;
	}

    await connectMongo();
	const game = await Game.findByIdAndDelete(req.params.id);
    res.status(200).json(game);
}
router.delete('/game/:id', deleteGame);


async function getGameById(req, res) {
    if (!req.params.id) {
		res.status(400).json({ error: 'Missing id param' });
		return;
	}

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


export default router;