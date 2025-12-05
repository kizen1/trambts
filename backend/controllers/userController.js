import bcrypt from "bcryptjs";
import fs from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import config from "../config.js";

const usersFile = join(config.dataDir, "users.json");

const readUsers = async () => {
  try {
    const content = await fs.readFile(usersFile, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
};

const saveUsers = async (users) => {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
};

export const getAllUsers = async (req, res) => {
  const users = await readUsers();

  const sortedUsers = users.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  res.json(sortedUsers);
};

export const getUserById = async (req, res) => {
  const users = await readUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { password, ...userData } = user;
  res.json(userData);
};

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await readUsers();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (req.user.vaiTro !== "admin") {
      return res.status(403).json({ error: "Only admins can create users" });
    }

    const newUser = {
      id: uuidv4(),
      hoTen: req.body.hoTen || "",
      matKhau: "123456",
      email: req.body.email || "",
      sdt: req.body.sdt || "",
      diaChi: req.body.diaChi || "",
      vaiTro: req.body.vaiTro || "",
      ghiChu: req.body.ghiChu || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  const users = await readUsers();
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const updates = { ...req.body };

  if (typeof updates.matKhau === "string" && updates.matKhau.trim() !== "") {
    updates.matKhau = await bcrypt.hash(updates.matKhau, 10);
  } else {
    delete updates.matKhau;
  }

  users[index] = {
    ...users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await saveUsers(users);
  res.json({ message: "User updated" });
};

export const deleteUser = async (req, res) => {
  let users = await readUsers();
  const userExists = users.some((u) => u.id === req.params.id);
  if (!userExists) return res.status(404).json({ error: "User not found" });
  users = users.filter((u) => u.id !== req.params.id);
  await saveUsers(users);
  res.json({ message: "User deleted" });
};
