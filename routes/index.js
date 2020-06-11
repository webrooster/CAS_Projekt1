const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render("index", {
    title: "CAS-FEE-2020 - PROJECT I",
    subtitle: "notes",
    description: "Lorem ipsum",
    slogan: "The to do list to organize work & life.",
    footer: "HSR - Fachhochschule Rapperswil - CAS-FEE-2020",
    sorting_title: "Sort your notes by:",
    form_title: "Add your note",
    form_description:
      "Add your description to your note. Add a title and place a finish date. Dont forget to place importance!",
    form_update_title: "Update your note",
  });
});

module.exports = router;
