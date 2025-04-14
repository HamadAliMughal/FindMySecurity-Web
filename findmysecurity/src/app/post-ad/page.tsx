'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JobPostingForm() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    location: '',
    region: '',
    postcode: '',
    payRate: '',
    payType: '',
    description: '',
    experience: '',
    certifications: '',
    shift: '',
    deadline: '',
  });

  useEffect(() => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      try {
        const parsed = JSON.parse(loginData);
        const roleId = parsed?.result?.role?.id;
        console.log('Parsed loginData:', roleId);
        if ([3, 4, 5].includes(Number(roleId))) {
          setAllowed(true);
          return;
        }
      } catch (error) {
        console.error("Failed to parse loginData:", error);
      }
    }

    router.push('/');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    localStorage.setItem('jobs', JSON.stringify([...jobs, formData]));
    alert('Job posted successfully!');
    setFormData({
      title: '',
      type: '',
      category: '',
      location: '',
      region: '',
      postcode: '',
      payRate: '',
      payType: '',
      description: '',
      experience: '',
      certifications: '',
      shift: '',
      deadline: '',
    });
  };

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* 🔴 Red Banner */}


      {/* ✅ Job Form */}
      <div className="max-w-4xl mx-auto">
      <div className="bg-black text-white p-4 rounded mb-8 mt-18 text-sm shadow">
        <h2 className="text-center font-bold mb-2">Hire Professional Security Experts – Post Your Job Today</h2>
        <p>✅ <strong>Why Choose FindMySecurity?</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Access a Verified Pool of Security Professionals – All candidates are SIA-licensed where required.</li>
          <li>Customised Hiring Options – Post jobs for part-time, full-time, contract, or event-based security roles.</li>
          <li>Fast & Efficient Matching – AI-powered recommendations to match your job with qualified professionals.</li>
          <li>Compliance Support – Get guidance on UK security hiring laws and best practices.</li>
          <li>No Hidden Fees – Transparent pricing with free job posting options and premium promotions.</li>
        </ul>
      </div>
        <h1 className="text-3xl font-bold mb-8 border-b pb-2">Post a Job</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="border p-2" />
          <select name="type" value={formData.type} onChange={handleChange} className="border p-2">
            <option value="">Job Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Contract</option>
            <option>Temporary/Event-based</option>
          </select>
          <input type="text" name="category" placeholder="Industry/Category" value={formData.category} onChange={handleChange} className="border p-2" />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2" />
          <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} className="border p-2" />
          <input type="text" name="postcode" placeholder="UK Postcode" value={formData.postcode} onChange={handleChange} className="border p-2" />
          <input type="text" name="payRate" placeholder="Salary / Pay Rate" value={formData.payRate} onChange={handleChange} className="border p-2" />
          <select name="payType" value={formData.payType} onChange={handleChange} className="border p-2">
            <option value="">Pay Type</option>
            <option>Hourly</option>
            <option>Daily</option>
            <option>Annual Salary</option>
          </select>
          <textarea name="description" placeholder="Job Description (100 words max)" value={formData.description} onChange={handleChange} maxLength={600} className="border p-2 md:col-span-2" />
          <input type="text" name="experience" placeholder="Required Experience" value={formData.experience} onChange={handleChange} className="border p-2" />
          <input type="text" name="certifications" placeholder="Required Certifications / Licences" value={formData.certifications} onChange={handleChange} className="border p-2" />
          <input type="text" name="shift" placeholder="Shift & Working Hours" value={formData.shift} onChange={handleChange} className="border p-2" />
          <input type="text" name="deadline" placeholder="Start Date & Application Deadline (Optional)" value={formData.deadline} onChange={handleChange} className="border p-2" />
          <button type="submit" className="bg-black text-white py-2 px-4 hover:bg-gray-800 col-span-full mt-4">POST NOW</button>
        </form>
      </div>
    </div>
  );
}
