import bcrypt from "bcryptjs";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
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

export const register = async (req, res) => {
  try {
    const { email, matKhau } = req.body;
    const users = await readUsers();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email || !matKhau) {
      return res
        .status(400)
        .json({ error: "Email và mật khẩu không được trống" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Không đúng format email" });
    }

    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(matKhau, 10);
    const newUser = {
      id: uuidv4(),
      email,
      matKhau: hashedPassword,
      vaiTro: "member",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await saveUsers(users);

    res
      .status(201)
      .json({ message: "User đã được đăng ký", userId: newUser.id });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Đăng ký thất bại" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, matKhau } = req.body;
    const users = await readUsers();

    // Basic checks
    if (!email || !matKhau) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Validate email format
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Find user
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) {
      return res.status(404).json({ error: "Email đã được đăng ký" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(matKhau, user.matKhau);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Không đúng mật khẩu" });
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        hoTen: user.hoTen,
        email: user.email,
        sdt: user.sdt,
        diaChi: user.diaChi,
        vaiTro: user.vaiTro,
        ghiChu: user.ghiChu,
      },
      config.jwtSecret
      // { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
