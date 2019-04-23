"use strict";

const router = require('express').Router();
import Invitation from "../../models/Invitation";
import Chronicle from "../../models/Chronicle";
import mailSender from "../../services/mailSender";
import uuid from "uuid";

router.get("/chronicle/:id", async (req, res) => {
    let invitation = await Invitation.findOne({ token: req.params.id });
    if (invitation) {
        res.json(await Chronicle.findOne({ _id: invitation.chronicleId }).select('name shortDescription createdAt'));
    }
    else {
        res.status("400").send("Invitation not found");
    }
});

router.post("/", async (req, res) => {
    try {
        req.body.storyTellerId = req.session.userId;
        let chronicle = await Chronicle.findOne({ _id: req.body.chronicleId, storyTeller: req.session.userId });
        if (chronicle) {
            req.body.token = uuid.v4();
            await mailSender.sendMail(req.body.emailAddress, 
                "Your invite to partecipate to Vampiere The Masquerade Chronicle",
                `Open this link to join ${process.env.PROTOCOL || "http" }://${process.env.ORIGIN || "localhost" }/#/join/${req.body.token}`)
            let invitation = new Invitation(req.body);
            res.json(await invitation.save());
        }
        else {
            res.status(400).send("Chronicle not found");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

export default router;