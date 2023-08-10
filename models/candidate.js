const db = require('../config/db');

class Candidate {
  static getByUserId(uid, callback) {
    const sql = 'SELECT * FROM Candidate WHERE uid = ?';
    db.query(sql, [uid], callback);
  }
}

module.exports = Candidate;
