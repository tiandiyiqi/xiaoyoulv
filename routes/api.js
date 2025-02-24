router.get("/users", (req, res) => {
  res.json(req.app.locals.users);
});

router.get("/posts", (req, res) => {
  res.json(req.app.locals.posts);
});

router.get("/events", (req, res) => {
  res.json(req.app.locals.events);
});

router.get("/resources", (req, res) => {
  res.json(req.app.locals.resources);
});
