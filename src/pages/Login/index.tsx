import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../stores/auth';
import AuthLayout from '../../components/AuthLayout';
import FormInput from '../../components/FormInput';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await signIn(formData.email, formData.password);
      toast.success('Logged in successfully');
      navigate('/appointments');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password');
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Or create a new account"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <FormInput
            id="email"
            label="Email address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            autoComplete="email"
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign in
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}