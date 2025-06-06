'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
} from '@mui/material';
import { API_URL } from "@/utils/path";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import toast from 'react-hot-toast';
import SecurityCategoriesModal from '@/sections/components/SecurityCategoriesModal/SecurityCategoriesModal';
import { Search } from 'lucide-react';

export default function JobPostingForm() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCategorySelect = (category: string, role: string) => {
    setFormData(prev => ({ ...prev, title: role, category: category }));
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      try {
        const parsed = JSON.parse(loginData);
        const roleId = parsed?.role?.id || parsed.roleId;
        console.log('Parsed loginData:', roleId);
        if ([1, 7, 4, 5].includes(Number(roleId))) {
          setAllowed(true);
          return;
        }
      } catch (error) {
        console.error('Failed to parse loginData:', error);
      }
    }

    router.push('/');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({ ...prev, deadline: date.toISOString().split('T')[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const loginData = localStorage.getItem('loginData');
      if (!loginData) throw new Error('User not logged in');
  
      const parsed = JSON.parse(loginData);
      const userId = parsed?.id || parsed?.userId || parsed?.user?.id;
      const token2 = localStorage.getItem("authToken")?.replace(/^"|"$/g, '')
      if (!userId) throw new Error('User ID missing');
  
      const payload = {
        userId,
        jobTitle: formData.title,
        jobType: formData.type,
        industryCategory: formData.category,
        region: formData.region,
        postcode: formData.postcode,
        salaryRate: parseFloat(formData.payRate),
        salaryType: formData.payType?.toLowerCase(),
        jobDescription: formData.description,
        requiredExperience: formData.experience,
        requiredLicences: formData.certifications,
        shiftAndHours: formData.shift,
        startDate: formData.deadline,
        deadline: formData.deadline,
      };
  
      await fetch(`${API_URL}/security-jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token2}`,
        },
        body: JSON.stringify(payload),
      });
  
      toast.success('Job posted successfully!');
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
  
    } catch (error: any) {
      console.error('Failed to post job:', error);
      toast.error('Failed to post job. Please try again.');
    }
  };
  
  const greenOutlineSx = {
    '& .MuiOutlinedInput-root': {
      // color: 'green', // text color
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, 0.23)', // default border
      },
      '&:hover fieldset': {
        borderColor: 'green', // hover border
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green', // focus border
      },
    },
    '& .MuiInputLabel-root': {
      color: 'gray', // default label
    },
    '& label.Mui-focused': {
      color: 'green', // focused label
    },
  }
  
  if (!allowed) return null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="min-h-screen bg-white text-black p-6 mt-20">
        <button
          className="absolute top-4 left-4 mt-20 z-2 flex items-center text-gray-600 hover:text-black"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
        </button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 border-b pb-2">Post a Job</h1>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1fr' },
              gap: 2,
              '& > *': {
                gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 1' }
              },
              '& > button[type="submit"]': {
                gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' }
              }
            }}
          >
            <div className="relative w-full">
              <TextField
                name="title"
                label="Job Title"
                value={formData.title}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{
                  ...greenOutlineSx,
                  '& .MuiOutlinedInput-root': {
                    ...greenOutlineSx['& .MuiOutlinedInput-root'],
                    paddingRight: '48px',
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <SecurityCategoriesModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSelect={handleCategorySelect}
            />
            <TextField
              name="type"
              label="Job Type"
              select
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            >
              {["Full-Time", "Part-Time", "Contract", "Temporary/Event-based"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

            <TextField
              name="category"
              label="Industry/Category"
              value={formData.category}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="region"
              label="Region"
              value={formData.region}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="postcode"
              label="UK Postcode"
              value={formData.postcode}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="payRate"
              label="Salary / Pay Rate"
              value={formData.payRate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="payType"
              label="Pay Type"
              select
              value={formData.payType}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            >
              {["Hourly", "Daily", "Annual Salary"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

            <TextField
              name="description"
              label="Job Description (100 words max)"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
              multiline
              rows={4}
            />

            <TextField
              name="experience"
              label="Required Experience"
              value={formData.experience}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="certifications"
              label="Required Certifications / Licences"
              value={formData.certifications}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <TextField
              name="shift"
              label="Shift & Working Hours"
              value={formData.shift}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={greenOutlineSx}
            />
            <DatePicker
              label="Start Date & Application Deadline"
              value={formData.deadline ? new Date(formData.deadline) : null}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  fullWidth: true,
                  sx: greenOutlineSx,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
                gridColumn: 'span 2',
                mt: 2,
              }}
            >
              POST NOW
            </Button>
          </Box>
        </div>
      </div>
    </LocalizationProvider>
  );
}
