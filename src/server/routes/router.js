"use strict";

const router = require('express').Router();
import User from '../models/User';

// router.use(async (req, res, next) => {
//     let user = await User.findOne({ _id: req.session.userId, token: req.session.token });
//     if (user) {
//         next();
//     }
//     else {
//         res.status(401).send("Unauthorized");
//     }
// });

router.use("/chronicles", require("./controllers/chroniclesController").default);
router.use("/user", require("./controllers/userController").default);
router.use("/characters", require("./controllers/charactersController").default);
router.use("/stories", require("./controllers/storiesController").default);
router.use("/coteries", require("./controllers/coteriesController").default);

export default router;