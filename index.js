const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = "pat-eu1-0b271d98-e99a-4419-895d-70ca9039f6eb";

// Get update form
app.get("/update-cobj", async (req, res) => {
  res.render("updates", {
    title: "Update Custom Object Form | Integrating With HubSpot I Practicum",
  });
});

// Submit update
app.post("/update-cobj", async (req, res) => {
  const updateRoute = "https://api.hubspot.com/crm/v3/objects/drivers";
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };
  const properties = req.body;

  try {
    await axios.post(updateRoute, { properties }, { headers });
    res.redirect("back");
  } catch (error) {
    console.error(error);
  }
});

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
