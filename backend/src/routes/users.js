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
    // } else{
    //    response.status(401).json({ error: "Unauthorized" });

    // }

  })

  // router.get("/users/:id", (request, response) => {
  //   const userId = request.params.id;

  //   db.query(`
  //     SELECT 
  //       id,
  //       firstname,
  //       lastname,
  //       email,
  //       city,
  //       volunteer_hours
  //     FROM users
  //     WHERE id = $1;
  //   `, [userId]).then(({ rows: user }) => {
  //     if (user.length === 0) {
  //       response.status(404).json({ error: "User not found" });
  //     } else {
  //       response.json(user[0]);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching user:", error);
  //     response.status(500).json({ error: "Internal Server Error" });
  //   });
  // });
  router.get("/users-by-email", (request, response) => {
    const userEmail = request.query.email;
  
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
  


  return router;
};
