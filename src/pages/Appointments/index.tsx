import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Appointment } from '../../types';
import AppointmentList from './AppointmentList';
import { useAuth } from '../../stores/auth';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAppointments() {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctors(name, specialization)
        `)
        .eq('patient_id', user.id)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        return;
      }

      setAppointments(data || []);
      setLoading(false);
    }

    fetchAppointments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      <AppointmentList appointments={appointments} />
    </div>
  );
}