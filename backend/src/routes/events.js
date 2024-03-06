const router = require("express").Router();

module.exports = db => {
  router.get("/events", (request, response) => {
    db.query(`
      SELECT 
        json_agg(
          json_build_object(
            'id', event.id,
            'event_name', event.event_name,
            'event_details', event.event_details,
            'start_time', event.start_time,
            'event_hours', event.event_hours,
            'event_status', event.event_status,
            'event_address', event.event_address,
            'city', event.city,
            'event_date', event.event_date,
            'creator', json_build_object(
              'id', creator.id,
              'first_name', creator.firstname,  -- Corrected column name here
              'last_name', creator.lastname,   -- Corrected column name here
              'email', creator.email
            )
          )
        ) as event_data
      FROM events AS event
      JOIN users AS creator ON creator.id = event.creator_id;
    `).then(({ rows }) => {
      response.json(rows[0].event_data);
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      response.status(500).json({ error: "Internal Server Error", details: error.message });
    });
  });

  return router;
};
