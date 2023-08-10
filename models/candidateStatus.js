const db = require('../config/db');

class CandidateStatus {
  static getByCandidateId(cid, callback) {
    const sql = 'SELECT * FROM CandidateStatus WHERE cid = ?';
    db.query(sql, [cid], callback);
  }
}

module.exports = CandidateStatus;
