"use strict";

const router = require('express').Router();
import Character from '../../models/Character';
import Coterie from '../../models/Coterie';
import Player from '../../models/Player';

// Get single character
router.get("/", async (req, res) => {
    try {
        res.json(await Character.find());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Get single character
router.get("/:id", async (req, res) => {
    try {
        res.json(await Character.findOne({ _id: req.params.id, userId: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new character
router.post("/", async (req, res) => {
    try {
        let character = createCharacter(req);
        let player = await Player.findOne({ _id: req.session.playerId });
        if (player) {
            player.characters.push(character);
            await player.save();
        }
        res.json(character.save());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// Create new character
router.post("/:id", async (req, res) => {
    try {
        let character = createCharacter(req);
        let coterie = await Coterie.findOne({ _id: req.params.id });
        if (coterie) {
            coterie.characters.push(character);
            await coterie.save();
        }
        res.json(character.save());
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.put("/:id", async (req, res) => {
    try {
        res.json(await Character.findByIdAndUpdate({ _id: req.params.id, userId: req.session.userId }, req.body));
    } catch (error) {
        console.error(e);
        res.status(500).json(e);
    }
})

// Delete character
router.delete("/:id", async (req, res) => {
    try {
        res.json(await Character.findByIdAndRemove({ _id: req.params.id, storyTeller: req.session.userId }));
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

function createCharacter(req) {
    return new Character({
        userId: req.session.userId, // "5c97bdf8664eff178ec46579",
        name: req.body.name,
        alive: true,
        picture: req.body.picture,
        startingExperience: req.body.startingExperience,
        totalExperience: req.body.startingExperience,
        mortal: {},
        mainInformation: req.body.mainInformation || {},
        health: {},
        willPower: {},
        attributes: {
            physical: Character.createCapacities(["strength", "dexterity", "stamina"]),
            social: Character.createCapacities(["carisma", "manipulation", "composure"]),
            mental: Character.createCapacities(["intelligence", "wits", "resolve"])
        },
        skills: {
            talents: Character.createCapacities(["athletics", "brawl", "Craft", "drive", "firearms", "larceny", "melee", "stealth", "survival"]),
            skills: Character.createCapacities(["animalKen", "etiquette", "insight", "intimidation", "leadership", "performance", "persuasion", "streetwise", "subterfuge"]),
            knowledges: Character.createCapacities(["academics", "awareness", "finance", "investigation", "medicine", "occult", "politics", "science", "technology"])
        },
        disciplines: [],
        advantages: [],
        flaws: []
    });
}

export default router;