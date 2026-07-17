// app/admin/auth-actions.ts
'use server';

import { getDb } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts';
import { brand } from '@/lib/data/brand';

export async function loginAdmin(formData: FormData) {
  try {
    const db = await getDb();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const allUsers = await db.select().from(users);

    // ONE-TIME SETUP: If no users exist, the first login creates the admin account
    if (allUsers.length === 0) {
      const salt = genSaltSync(10);
      const hash = hashSync(password, salt);
      
      await db.insert(users).values({
        id: `u-${Date.now()}`,
        email,
        passwordHash: hash,
      });
      
      const cookieStore = await cookies();
      cookieStore.set('admin_session', email, { httpOnly: true, secure: true, path: '/' });
      return { success: true };
    }

    // Normal Login Flow
    const user = allUsers.find(u => u.email === email);
    if (!user || !compareSync(password, user.passwordHash)) {
      throw new Error('Invalid email or password');
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_session', user.email, { httpOnly: true, secure: true, path: '/' });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function requestPasswordReset(formData: FormData) {
  try {
    const db = await getDb();
    const email = formData.get('email') as string;
    
    const existingUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = existingUsers[0];

    if (user) {
      const token = crypto.randomUUID(); // Secure random string
      const expiry = Date.now() + 3600000; // 1 hour from now

      await db.update(users)
        .set({ resetToken: token, resetTokenExpiry: expiry })
        .where(eq(users.id, user.id));

      const resetLink = `${brand.url}/admin/reset-password?token=${token}`;
      
      // IMPORTANT: Integrate Resend, SendGrid, or Nodemailer here to actually send the email.
      console.log(`\n\n--- PASSWORD RESET LINK (Check Server Logs) ---\n${resetLink}\n-------------------------------------------\n\n`);
    }

    // Always return success even if email isn't found to prevent email enumeration attacks
    return { success: true, message: 'If that email exists, a reset link has been sent.' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function resetPassword(formData: FormData) {
  try {
    const db = await getDb();
    const token = formData.get('token') as string;
    const newPassword = formData.get('password') as string;

    const existingUsers = await db.select().from(users).where(eq(users.resetToken, token)).limit(1);
    const user = existingUsers[0];

    if (!user || !user.resetTokenExpiry || Date.now() > user.resetTokenExpiry) {
      throw new Error('Invalid or expired reset token');
    }

    const salt = genSaltSync(10);
    const hash = hashSync(newPassword, salt);

    await db.update(users)
      .set({ passwordHash: hash, resetToken: null, resetTokenExpiry: null })
      .where(eq(users.id, user.id));

    return { success: true, message: 'Password updated successfully. You can now log in.' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}