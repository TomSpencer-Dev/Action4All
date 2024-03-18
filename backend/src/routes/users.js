const router = require("express").Router();

module.exports = db => {

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
    // } else{
    //    response.status(401).json({ error: "Unauthorized" });

    // }

  })

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

        // Check if password matches
        if (password === user.user_password) {
          // Passwords match, proceed with login
          //res.cookie("user_id", user.id);
          return res.json(user);
        } else {
          // Passwords don't match, return empty response
          return res.json({});
        }
      })
      .catch(error => {
        // Handle any errors that occur during the database query
        console.error('Error querying database:', error);
        return res.status(500).json({ error: 'An error occurred during login.' });
      });
});


//   router.post("/login", (req, res) => {
//     console.log(req.body)
//     const email = req.body.email;
//     const password = req.body.password;

//     db.query(`SELECT * FROM users WHERE email = $1`, [email])
//       .then(data => {
//         const user = data.rows[0]
//         if(!user){
//           return(res.json({}))
//         }

// //checkpassword


//         res.json(data.rows[0])
//       });

//     return;
//     res.cookie("user_id", 1)
//     res.json({
//       id: 1,
//       email: "user@gmail.com",
//       firstname: "Tom",
//       lastname: "Jhon"
//     })

//   })


  // router.get("/users-by-email", (request, response) => {
  //   const userEmail = request.query.email;
  //   //const userPassword= request.query.password;
  //   //const { email, password } = request.body;
  //   db.query(`
  //     SELECT 
  //       id,
  //       firstname,
  //       lastname,
  //       password,
  //       email,
  //       city,
  //       volunteer_hours
  //     FROM users
  //     WHERE email = $1;
  //   `, [userEmail]).then(({ rows: user }) => {
  //     if (user.length === 0) {
  //       response.status(404).json({ error: "User not found" });
  //     } else {
  //       response.json(user[0]);
  //     }
  //   })
  //     .catch((error) => {
  //       console.error("Error fetching user:", error);
  //       response.status(500).json({ error: "Internal Server Error" });
  //     });
  // });

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
