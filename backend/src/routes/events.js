
const router = require("express").Router();

module.exports = db => {
  // GET all events
  router.get("/:id", (request, response) => {
    const userId = request.params.id;
    const location = request.query.location;

    let WHERE_CLAUSE = "";
    {(location === "/") ? (
      WHERE_CLAUSE = `WHERE creator_id = ${userId}
      OR event.id IN (
        SELECT event_id
        FROM eventuser
        WHERE user_id = ${userId} );`)
        : 
(WHERE_CLAUSE = `WHERE creator_id != ${userId}
      AND event.id  NOT IN (
        SELECT event_id
        FROM eventuser
        WHERE user_id = ${userId} );`)
    }

    const query = `
      SELECT 
        json_agg(
          json_build_object(
            'id', event.id,
            'event_name', event.event_name,
            'event_details', event.event_details,
            'start_time', event.start_time,
            'end_time', event.end_time,
            'event_hours', event.event_hours,
            'event_status', event.event_status,
            'event_address', event.event_address,
            'city', event.city,
            'event_date', event.event_date,
            'creator', json_build_object(
              'id', creator.id,
              'first_name', creator.firstname,
              'last_name', creator.lastname,
              'email', creator.email
            )
          )
        ) as event_data
      FROM events AS event
      JOIN users AS creator ON creator.id = event.creator_id
      ${WHERE_CLAUSE}
      
    `;
    db.query(query).then(({ rows }) => {
      response.json(rows[0].event_data);
    })
      .catch((error) => {
        console.error("Error fetching events:", error);
        response.status(500).json({ error: "Internal Server Error", details: error.message });
      });
  });

 // POST create event
router.post("/", (request, response) => {
    const {
      event_name,
      event_details,
      start_time,
      end_time,
      event_hours,
      event_status,
      event_address,
      city,
      event_date,
      creator_id,
    } = request.body;

    db.query(
      `
      INSERT INTO events (
        event_name,
        event_details,
        start_time,
        end_time,
        event_hours,
        event_address,
        city,
        event_date,
        creator_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
    `,
      [
        event_name,
        event_details,
        start_time,
        end_time,
        event_hours,
        event_address,
        city,
        event_date,
        1
      ]
    )
      .then(({ rows }) => {
        response.json(rows[0]);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        response.status(500).json({
          error: "Internal Server Error",
          details: error.message,
        });
      });
  });

   // PUT update event
  router.put("/:id", (request, response) => {
    const eventId = request.params.id;
    const {
      event_name,
      event_details,
      start_time,
      end_time,
      event_hours,
      event_status,
      event_address,
      city,
      event_date,
    } = request.body;

    db.query(
      `
      UPDATE events SET
        event_name = $1,
        event_details = $2,
        start_time = $3,
        end_time = $4,
        event_hours = $5,
        event_status = $6,
        event_address = $7,
        city = $8,
        event_date = $9
      WHERE id = $10 RETURNING *;
    `,
      [
        event_name,
        event_details,
        start_time,
        end_time,
        event_hours,
        event_status,
        event_address,
        city,
        event_date,
        eventId,
      ]
    )
      .then(({ rows }) => {
        if (rows.length === 0) {
          response.status(404).json({ error: "Event not found" });
        } else {
          response.json(rows[0]);
        }
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        response.status(500).json({ error: "Internal Server Error", details: error.message });
      });
  });

   // DELETE event
router.delete("/:id", async (request, response) => {
    const eventId = request.params.id;
  
    try {
      
      await db.query(`DELETE FROM eventuser WHERE event_id = $1;`, [eventId]);
      const eventDeletionResult = await db.query(`DELETE FROM events WHERE id = $1 RETURNING *;`, [eventId]);
  
      if (eventDeletionResult.rows.length === 0) {
        response.status(404).json({ error: "Event not found" });
        return;
      }
  
      response.json({ message: "Event and related entries deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      response.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });
  
 
// routes/events.js

router.get("/", (request, response) => {
  const userId = request.query.userId; 

  db.query(`
    SELECT 
      json_agg(
        json_build_object(
          'id', event.id,
          'event_name', event.event_name,
          'event_details', event.event_details,
          'start_time', event.start_time,
          'end_time', event.end_time,
          'event_hours', event.event_hours,
          'event_status', event.event_status,
          'event_address', event.event_address,
          'city', event.city,
          'event_date', event.event_date,
          'creator', json_build_object(
            'id', creator.id,
            'first_name', creator.firstname,
            'last_name', creator.lastname,
            'email', creator.email
          )
        )
      ) as event_data
    FROM events AS event
    JOIN users AS creator ON creator.id = event.creator_id
    WHERE event.creator_id = $1 OR event.user_id = $1; // Filter events created by or signed up by the user
  `, [userId])
  .then(({ rows }) => {
    response.json(rows[0].event_data);
  })
  .catch((error) => {
    console.error("Error fetching events:", error);
    response.status(500).json({ error: "Internal Server Error", details: error.message });
  });
});

module.exports = router;

  return router;
};




