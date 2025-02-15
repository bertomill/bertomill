import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | Berto Mill',
  description: 'Admin login page',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 mx-4 bg-[#141414] rounded-xl shadow-2xl border border-[#1f1f1f]">
        <h2 className="mb-6 text-2xl font-bold text-center text-[#e4e4e7]">
          Admin Login
        </h2>
        <LoginForm />
      </div>
    </main>
  );
}
