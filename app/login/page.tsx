'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('user_session', JSON.stringify(data.data));
        router.push('/signals');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Không thể kết nối tới máy chủ!');
    }
  };

  return (
    <div className="min-h-screen bg-[#061811] text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-[#0b291e] border border-emerald-800/60 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-center text-amber-400 mb-6">🔑 ĐĂNG NHẬP HỆ THỐNG</h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-emerald-300 font-bold mb-1">TÀI KHOẢN VIP</label>
            <input
              type="text"
              required
              placeholder="Nhập tài khoản..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#04140e] border border-emerald-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs text-emerald-300 font-bold mb-1">MẬT KHẨU</label>
            <input
              type="password"
              required
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#04140e] border border-emerald-800 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 text-black font-extrabold py-2.5 rounded-lg text-sm shadow-lg transition-all mt-2"
          >
            🔑 XÁC NHẬN ĐĂNG NHẬP PLUS
          </button>
        </form>
      </div>
    </div>
  );
}
