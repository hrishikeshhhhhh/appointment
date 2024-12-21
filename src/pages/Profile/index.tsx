import { useEffect, useState } from 'react';
import { useAuth } from '../../stores/auth';
import { supabase } from '../../lib/supabase';
import { Patient } from '../../types';
import ProfileForm from './ProfileForm';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <ProfileForm initialData={profile} />
    </div>
  );
}