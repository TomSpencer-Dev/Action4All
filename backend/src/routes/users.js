const router = require("express").Router();

module.exports = db => {
 
  router.get("/users", (request, response) => {
      //const user = request.session.user; // Access the user from the session cookie
      //const user = request.session && request.session.user;
    //if(user){
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
      WHERE email = $1;
    `, [userEmail]).then(({ rows: user }) => {
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

  router.post('/register', async (req, res) => {
    const userData = req.body;
    console.log('Received registration data:', userData);

    try {
      // Insert userData into the USERS table
      const result = await db.query(
        'INSERT INTO users (firstname, lastname, email, user_password, city, volunteer_hours) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [
          userData.firstName,
          userData.lastName,
          userData.email,
          userData.password,
          userData.city,
          0,
        ]
      );

      console.log('Registration successful. Result:', result.rows[0]);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  return router;
};
