// models/duty.js

class Duty {
  constructor(id, name, createdAt, updatedAt) {
    this.id = id; // Unique identifier
    this.name = name; // Duty name
    this.createdAt = createdAt; // Creation timestamp
    this.updatedAt = updatedAt; // Last updated timestamp
  }
}

module.exports = Duty;
