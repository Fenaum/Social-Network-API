// routes/index.js

const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// if user does not reach an endpoint
router.use((req, res) => {
    res.status(404).send("<h1>Wrong Route!</h1>");
});

module.exports = router;
