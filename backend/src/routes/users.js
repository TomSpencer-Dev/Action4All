//Routes for users table
const router = require("express").Router();

module.exports = db => {
  // Route to get all users
  router.get("/", (request, response) => {

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
  })

  //Get users by id
  router.get("/:id", (request, response) => {
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

  //Post user with matching email and password
  router.post("/login", (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(data => {
        const user = data.rows[0];
        if (!user) {
          return res.json({});
        }

        if (password === user.user_password) {
          return res.json(user);
        } else {

          return res.json({});
        }
      })
      .catch(error => {
        console.error('Error querying database:', error);
        return res.status(500).json({ error: 'An error occurred during login.' });
      });
  });
  // Route for user registration
  router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
      const result = await db.query(
        'INSERT INTO users (firstname, lastname, email, user_password, city, volunteer_hours) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
          userData.city,
          0
        ]
      );

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
return router;
};
