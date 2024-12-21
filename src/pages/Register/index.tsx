import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../stores/auth';
import AuthLayout from '../../components/AuthLayout';
import FormInput from '../../components/FormInput';

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      toast.success('Account created successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to create account');
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Already have an account? Sign in"
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
            autoComplete="new-password"
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}