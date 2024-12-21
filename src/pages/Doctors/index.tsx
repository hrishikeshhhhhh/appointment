import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Doctor } from '../../types';
import DoctorCard from './DoctorCard';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      const { data, error } = await supabase
        .from('doctors')
        .select('*, department:departments(name)');

      if (error) {
        console.error('Error fetching doctors:', error);
        return;
      }

      setDoctors(data || []);
      setLoading(false);
    }

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Our Doctors</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}