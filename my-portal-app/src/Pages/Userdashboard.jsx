import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Edit2, CheckCircle } from "lucide-react";

export default function ProfileTopPanel() {
  const [profile, setProfile] = useState({
    name: "Kishan Mistry",
    course: "B.Tech Computer Science",
    university: "XYZ University",
    location: "Ahmedabad, India",
    phone: "+91 9876543210",
    email: "kishan@example.com",
    emailVerified: true,
    gender: "Male",
    birthday: "2002-05-10",
    profileCompletion: 80,
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex items-center gap-6"
    >
      {/* Profile Picture & Progress */}
      <div className="relative">
        <svg className="absolute top-0 left-0 w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="#e5e7eb"
            strokeWidth="6"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={
              2 * Math.PI * 44 * (1 - profile.profileCompletion / 100)
            }
            fill="transparent"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <img
          src="https://i.pravatar.cc/150"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white shadow relative z-10"
        />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
        <p className="text-sm text-gray-600">
          {profile.course} • {profile.university}
        </p>

        {/* Location, Phone, Email */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            {profile.location}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-gray-500" />
            {profile.phone}
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-500" />
            {profile.email}
            {profile.emailVerified && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        {/* Editable Gender & Birthday */}
        <div className="mt-3 flex gap-4 text-sm">
          {isEditing ? (
            <>
              <select
                value={profile.gender}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border rounded-lg px-2 py-1"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                value={profile.birthday}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, birthday: e.target.value }))
                }
                className="border rounded-lg px-2 py-1"
              />
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-lg"
                onClick={() => setIsEditing(false)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="text-gray-700">
                Gender: {profile.gender}
              </span>
              <span className="text-gray-700">
                Birthday: {profile.birthday}
              </span>
              <button
                className="text-blue-600 flex items-center gap-1"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
