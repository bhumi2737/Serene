const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const DATA_DIR = path.join(__dirname, "..", "data");
const FILE = path.join(DATA_DIR, "users.json");

async function ensureFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(FILE);
  } catch (e) {
    await fs.writeFile(FILE, "[]", "utf8");
  }
}

async function readUsers() {
  await ensureFile();
  const txt = await fs.readFile(FILE, "utf8");
  try {
    return JSON.parse(txt || "[]");
  } catch (e) {
    await fs.writeFile(FILE, "[]", "utf8");
    return [];
  }
}

async function writeUsers(users) {
  await ensureFile();
  await fs.writeFile(FILE, JSON.stringify(users, null, 2), "utf8");
}

async function findByEmail(email) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase());
}

async function findById(id) {
  const users = await readUsers();
  return users.find((u) => u.id === String(id) || u._id === String(id));
}

async function createUser({ name, email, password }) {
  const users = await readUsers();
  const id = Date.now().toString();
  const hashed = await bcrypt.hash(password, 10);
  const user = { id, name, email: email.toLowerCase(), password: hashed, createdAt: new Date().toISOString() };
  users.push(user);
  await writeUsers(users);
  return user;
}

async function verifyPassword(user, enteredPassword) {
  if (!user) return false;
  return await bcrypt.compare(enteredPassword, user.password);
}

module.exports = { findByEmail, createUser, findById, verifyPassword };
