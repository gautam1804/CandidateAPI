const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Candidate = require('../models/candidate');
const CandidateStatus = require('../models/candidateStatus');

router.post('/status-count', (req, res) => {
  const { uid } = req.body;

  User.getStatusCount(uid, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Failed to fetch status count' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const statusCount = results[0];
    res.json(statusCount);
  });
});

module.exports = router;
