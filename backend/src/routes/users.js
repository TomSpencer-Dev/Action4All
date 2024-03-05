const router = require("express").Router();

module.exports = db => {
  router.get("/events", (request, response) => {
    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    db.query(`
      SELECT * FROM users
    `)
  });

  return router;
};
