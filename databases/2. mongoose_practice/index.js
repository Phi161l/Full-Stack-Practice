const mongoose = require('mongoose');

// 1️⃣ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practiceDB')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// 2️⃣ Define Schemas
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  email: String
}); 

// 3️⃣ Create Models (collections)
const User = mongoose.model('User', userSchema);
const Student = mongoose.model('Student', studentSchema);

// 4️⃣ Insert sample data
async function createSampleData() {
  const users = [
    new User({ name: 'Ibrahim', age: 22, email: 'ibrahim@example.com' }),
    new User({ name: 'Alice', age: 25, email: 'alice@example.com' })
  ];

  const students = [
    new Student({ name: 'Bob', grade: 'A', email: 'bob@student.com' }),
    new Student({ name: 'Eve', grade: 'B', email: 'eve@student.com' })
  ];

  await User.insertMany(users);
  await Student.insertMany(students);

  console.log('✅ Sample Users and Students saved');
}

// 5️⃣ Delete all documents in both collections
async function deleteAllData() {
  const userResult = await User.deleteMany({});
  const studentResult = await Student.deleteMany({});

  console.log('✅ All Users deleted:', userResult.deletedCount);
  console.log('✅ All Students deleted:', studentResult.deletedCount);
}

// Example usage:

createSampleData();    // Uncomment to insert sample data
// deleteAllData();          // Uncomment to delete all documents
