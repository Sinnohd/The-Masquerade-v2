"use strict";

const router = require('express').Router();
import Story from '../../models/Story';
import Chronicle from '../../models/Chronicle';

// Create new story
router.post("/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId });
        if (chronicle) {
            console.log(1);
            let story = new Story(req.body);
            story.storyTeller = chronicle.storyTeller;
            await story.save();
            console.log(2);
            chronicle.stories.push(story);
            await chronicle.save();
            console.log(3);
            res.json(story);
        }
        else {
            res.status(500).send("Chronacle not found");
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get by id
router.get("/:id", async (req, res) => {
    try {
        res.json(await Story.findOne({ _id: req.params.id, storyTeller: req.session.userId }));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

// get all by chronicle id
router.get("/all/:id", async (req, res) => {
    try {
        let chronicle = await Chronicle.findOne({ _id: req.params.id, storyTeller: req.session.userId }).populate("stories");
        res.json(chronicle.stories.sort((a, b) => a.createdAt < b.createdAt));
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
});

router.delete("/:id", async (req, res) => {
    let story = await Story.findOne({ _id: req.params.id, storyTeller: req.session.userId });
    await story.remove();
    res.send("Deleted");
});

export default router;