import { redirect } from '@remix-run/react';
import { prisma } from '../data/database.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage } from '@remix-run/node';
interface SignupInput {
  email: string;
  password: string;
}

export async function signup({ email, password }: SignupInput): Promise<Response> {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) throw new Error('Email in use');
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return createUserSession(user.id, '/expenses')
}
interface AuthInput {
  email: string;
  password: string;
}
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set in .env file');
}
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});
export async function login({ email, password }: AuthInput): Promise<Response> {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (!existingUser) {
    throw new Error('User with the provided email was not found');
  }
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new Error('Invalid password');
  }
  return createUserSession(existingUser.id, '/expenses');
}
export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}
export async function requireUserSession(request: Request) {
 const user=await getUserfromSession(request)
 return user
 if(!user) throw redirect('/auth?mode=login')
}
export async function getUserfromSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.get('userId')
  console.log("userid is ins server", userId);
  if (!userId) return null  
  // or use return {userId:null} if u r using return {userid} named return
  return userId ;
}
export async function destroyUserfromSession(request: Request){
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}
