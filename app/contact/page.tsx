"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { BiMessageDetail } from "react-icons/bi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message); // success message from backend
        setForm({ name: "", email: "", message: "" }); // reset form
      } else {
        setStatus(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200 p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-10 rounded-3xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Contact Me
        </h1>

        {/* Name */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center border border-gray-600 rounded-lg p-2 focus-within:ring-2 ring-yellow-400"
        >
          <HiOutlineUser className="text-yellow-400 mr-2 w-6 h-6" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 outline-none rounded-md placeholder-gray-300 bg-gray-700 text-white"
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center border border-gray-600 rounded-lg p-2 focus-within:ring-2 ring-yellow-400"
        >
          <HiOutlineMail className="text-yellow-400 mr-2 w-6 h-6" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 outline-none rounded-md placeholder-gray-300 bg-gray-700 text-white"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-start border border-gray-600 rounded-lg p-2 focus-within:ring-2 ring-yellow-400"
        >
          <BiMessageDetail className="text-yellow-400 mr-2 w-6 h-6 mt-1" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-2 outline-none rounded-md h-32 resize-none placeholder-gray-300 bg-gray-700 text-white"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-400 text-gray-900 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
        >
          Send Message
        </motion.button>

        {/* Status */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-2 ${
            status.includes("Failed") ? "text-red-500" : "text-green-400"
          }`}
        >
          {status}
        </motion.p>
      </motion.form>
    </div>
  );
}
