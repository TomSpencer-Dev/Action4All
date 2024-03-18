
const router = require("express").Router();

module.exports = db => {
  // GET all events
  router.get("/:id", (request, response) => {
    const userId = request.params.id;
    console.log('line 8: ', userId)
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
      WHERE creator_id != ${userId};
    `;
    db.query(query).then(({ rows }) => {
      response.json(rows[0].event_data);
    })
      .catch((error) => {
        console.error("Error fetching events:", error);
        response.status(500).json({ error: "Internal Server Error", details: error.message });
      });
    //  }else{
    //    response.status(401).json({ error: "Unauthorized" });
    //  }
  });

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
  // PUT (update) an existing event
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

  // DELETE an event
  router.delete("/events/:id", (request, response) => {
    const eventId = request.params.id;

    db.query(`DELETE FROM events WHERE id = $1 RETURNING *;`, [eventId])
      .then(({ rows }) => {
        if (rows.length === 0) {
          response.status(404).json({ error: "Event not found" });
        } else {
          response.json({ message: "Event deleted successfully" });
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        response.status(500).json({ error: "Internal Server Error", details: error.message });
      });
  });

  return router;
};




