'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { API_URL } from "@/utils/path";


const API_BASE = `${API_URL}/auth`;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

const ForgetPassword = () => {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      {code ? <ResetPasswordForm code={code} /> : <EmailForm />}
    </div>
  );
};

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE}/request-password-reset`, { email });
      toast.success('Reset link sent! Please check your email.');
      setMessage('Reset link sent! Please check your email.');
      setEmail('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-3 bg-black border border-zinc-600 rounded mb-2 text-white placeholder-gray-400"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
};

const ResetPasswordForm = ({ code }: { code: string }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [success, setSuccess] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    setApiError('');
    setLoading(true);

    const errs: typeof errors = {};
    if (!isValidPassword(password)) {
      toast.error('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
      errs.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number.';
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      errs.confirm = 'Passwords do not match.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${API_BASE}/reset-password`, {
        code,
        newPassword: password,
      });
      toast.success('Password reset successfully! Redirecting to login...');
      setSuccess('Password reset successfully!');
      setPassword('');
      setConfirm('');
      setTimeout(() => router.push('/signin'), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
      setApiError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 p-6 rounded-lg w-full max-w-md shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

      <div className="relative mb-2">
        <input
          type={show ? 'text' : 'password'}
          placeholder="New Password"
          className="w-full p-3 bg-black border border-zinc-600 rounded text-white placeholder-gray-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <span
          className="absolute top-3 right-3 cursor-pointer text-gray-400"
          onClick={() => setShow(!show)}
        >
          {show ? '🙈' : '👁️'}
        </span>
      </div>
      {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

      <div className="relative mb-2">
        <input
          type={show ? 'text' : 'password'}
          placeholder="Confirm Password"
          className="w-full p-3 bg-black border border-zinc-600 rounded text-white placeholder-gray-400"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <span
          className="absolute top-3 right-3 cursor-pointer text-gray-400"
          onClick={() => setShow(!show)}
        >
          {show ? '🙈' : '👁️'}
        </span>
      </div>
      {errors.confirm && <p className="text-red-500 text-sm mb-2">{errors.confirm}</p>}
      {apiError && <p className="text-red-500 text-sm mb-2">{apiError}</p>}
      {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ForgetPassword;
