const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const CHAT_ENGINE_PROJECT_ID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID;
const CHAT_ENGINE_PRIVATE_KEY = process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY;

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;
  // console.log(req.body);
  try {
   // PUT   Get or Create User
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret },
      { headers: { "PRIVATE-KEY": CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// On port 3001!
app.listen(3001);