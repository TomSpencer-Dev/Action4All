const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(`
      SELECT 
        id,
        firstname,
        lastname,
        email,
        city,
        volunteer_hours
      FROM users;
    `).then(({ rows: users }) => {
      response.json(users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
  });

  router.get("/users/:id", (request, response) => {
    const userId = request.params.id;

    db.query(`
      SELECT 
        id,
        firstname,
        lastname,
        email,
        city,
        volunteer_hours
      FROM users
      WHERE id = $1;
    `, [userId]).then(({ rows: user }) => {
      if (user.length === 0) {
        response.status(404).json({ error: "User not found" });
      } else {
        response.json(user[0]);
      }
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
  });


  return router;
};
