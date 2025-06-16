const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors())

app.listen(port, () => console.log(`Listening on port ${port}`));


app.get("/api", (req, res) => {
    res.send({ message: "Hello from Express!" });
});
