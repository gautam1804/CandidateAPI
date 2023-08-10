const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'mysql',
    database: 'notaryapp',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  
  // Create tables if they don't exist
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS User (
      uid INT PRIMARY KEY,
      name VARCHAR(255)
    );
  `;
  
  const createCandidateTable = `
    CREATE TABLE IF NOT EXISTS Candidate (
      cid INT PRIMARY KEY,
      uid INT,
      candidateName VARCHAR(255),
      FOREIGN KEY (uid) REFERENCES User(uid)
    );
  `;
  
  const createCandidateStatusTable = `
    CREATE TABLE IF NOT EXISTS CandidateStatus (
      id INT PRIMARY KEY,
      cid INT,
      status VARCHAR(50),
      statusUpdatedAt DATE,
      FOREIGN KEY (cid) REFERENCES Candidate(cid)
    );
  `;
  
  connection.query(createUserTable, (err) => {
    if (err) {
      console.error('Error creating User table:', err);
    } else {
      console.log('User table created successfully');
      
      // Insert sample data into User table
      const insertUserQuery = `
        INSERT INTO User (uid, name)
        VALUES (4, 'Rahul');
      `;
      connection.query(insertUserQuery, (insertErr) => {
        if (insertErr) {
          console.error('Error inserting data into User table:', insertErr);
        } else {
          console.log('Sample data inserted into User table');
        }
      });
    }
  });
  
  connection.query(createCandidateTable, (err) => {
    if (err) {
      console.error('Error creating Candidate table:', err);
    } else {
      console.log('Candidate table created successfully');
      
      // Insert sample data into Candidate table
      const insertCandidateQuery = `
        INSERT INTO Candidate (cid, uid, candidateName)
        VALUES
          (1, 4, 'Priyanka'),
          (2, 4, 'Manish'),
          (3, 4, 'Vedant');
      `;
      connection.query(insertCandidateQuery, (insertErr) => {
        if (insertErr) {
          console.error('Error inserting data into Candidate table:', insertErr);
        } else {
          console.log('Sample data inserted into Candidate table');
        }
      });
    }
  });
  
  connection.query(createCandidateStatusTable, (err) => {
    if (err) {
      console.error('Error creating CandidateStatus table:', err);
    } else {
      console.log('CandidateStatus table created successfully');
      
      // Insert sample data into CandidateStatus table
      const insertStatusQuery = `
        INSERT INTO CandidateStatus (id, cid, status, statusUpdatedAt)
        VALUES
          (1, 1, 'joined', '2023-03-24'),
          (2, 2, 'joined', '2022-12-12'),
          (3, 3, 'interview', '2023-06-28');
      `;
      connection.query(insertStatusQuery, (insertErr) => {
        if (insertErr) {
          console.error('Error inserting data into CandidateStatus table:', insertErr);
        } else {
          console.log('Sample data inserted into CandidateStatus table');
        }
      });
    }
  });
});

module.exports = connection;


