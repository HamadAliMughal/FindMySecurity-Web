"use client";

import { useState } from "react";
import { LockIcon } from "lucide-react";
import { FaEnvelope, FaMapMarkerAlt, FaUser, FaPhone } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface ClientGeneralFormProps {
  id: number;
  title: string;
  onSubmit: (data: any) => void; // Callback function to pass data to parent
}

const ClientGeneralForm: React.FC<ClientGeneralFormProps> = ({ id, title, onSubmit }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    screenName: "",
    phoneNumber: "",
    dateOfBirth: { day: "", month: "", year: "" },
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (["day", "month", "year"].includes(name)) {
      setFormData({
        ...formData,
        dateOfBirth: { ...formData.dateOfBirth, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { day, month, year } = formData.dateOfBirth;
    const formattedDateOfBirth = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    const submissionData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      screenName: formData.screenName,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formattedDateOfBirth,
      address: formData.address,
      permissions: {},
      roleId: id,
    };

    // Send data back to the parent component
    onSubmit(submissionData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold text-center my-4 text-black">Free Registration For {title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <LockIcon className="absolute left-3 top-3 text-gray-500" />
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Screen Name */}
        <div className="relative">
          <FaUser className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="screenName"
            value={formData.screenName}
            onChange={handleChange}
            placeholder="Screen Name"
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <div className="grid grid-cols-3 gap-2">
            <select name="day" value={formData.dateOfBirth.day} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">DD</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={String(i + 1)}>{i + 1}</option>
              ))}
            </select>
            <select name="month" value={formData.dateOfBirth.month} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">MM</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={String(m)}>{m}</option>
              ))}
            </select>
            <select name="year" value={formData.dateOfBirth.year} onChange={handleChange} className="w-full px-3 py-2 border rounded-md bg-gray-100">
              <option value="">YYYY</option>
              {[...Array(100)].map((_, i) => (
                <option key={i} value={String(2024 - i)}>{2024 - i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-md hover:bg-blue-700">
          Join now for free
        </button>
      </form>
    </div>
  );
};

export default ClientGeneralForm;
