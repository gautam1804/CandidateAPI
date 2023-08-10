const db = require('../config/db');

class User {
  static getStatusCount(uid, callback) {
    const sql = `
      SELECT
        u.uid AS Uid,
        COUNT(c.cid) AS TotalCandidates,
        SUM(CASE WHEN cs.status = 'joined' THEN 1 ELSE 0 END) AS Joined,
        SUM(CASE WHEN cs.status = 'interview' THEN 1 ELSE 0 END) AS Interview
      FROM User u
      LEFT JOIN Candidate c ON u.uid = c.uid
      LEFT JOIN CandidateStatus cs ON c.cid = cs.cid
      WHERE u.uid = ?
      GROUP BY u.uid
    `;
    db.query(sql, [uid], callback);
  }
}

module.exports = User;
