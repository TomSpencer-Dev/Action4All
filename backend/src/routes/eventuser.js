//routes for eventuser table
const router = require("express").Router();

module.exports = db => {

  router.post("/:userId/:eventId", async (req, res) => {
    const { userId, eventId } = req.params;
    try {
      const result = await db.query(
        'INSERT INTO eventuser (user_id, event_id) VALUES ($1, $2)',
        [userId, eventId]
      );
      res.status(200).json({ success: true, message: "User added to event successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while adding the user to the event." });
    }
  });

  // DELETE an event from eventuser
  router.delete("/:userId/:eventId", async (req, res) => {
    const { userId, eventId } = req.params;
    try {
      const result = await db.query(
        `DELETE FROM eventuser WHERE user_id = $1 AND event_id = $2`,
        [userId, eventId]
      );
      res.status(200).json({ success: true, message: "User deleted event successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while deleting the event from the user." });
    }
  });
  return router;
};