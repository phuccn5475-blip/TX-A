import { NextResponse } from 'next/server';

// TÀI KHOẢN VÀ MẬT KHẨU CỐ ĐỊNH Ở ĐÂY (ẨN HOÀN TOÀN VỚI GIAO DIỆN)
const VALID_USER = 'admin';
const VALID_PASS = '123456';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === VALID_USER && password === VALID_PASS) {
      return NextResponse.json({
        success: true,
        data: { username: VALID_USER, role: 'VIP' }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Tài khoản hoặc mật khẩu không chính xác!' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Lỗi xử lý hệ thống!' },
      { status: 500 }
    );
  }
}
