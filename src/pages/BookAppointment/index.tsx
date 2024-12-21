import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../stores/auth';
import { Doctor } from '../../types';
import DoctorSelect from './DoctorSelect';
import TimeSlotSelect from './TimeSlotSelect';

// Simulated time slots (replace with actual availability data)
const AVAILABLE_TIMES = Array.from({ length: 8 }, (_, i) => ({
  time: format(new Date().setHours(9 + i, 0), 'HH:mm'),
  available: Math.random() > 0.3,
}));

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState(searchParams.get('doctor') || '');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedTime, setSelectedTime] = useState('');
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book an appointment');
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase.from('appointments').insert({
        patient_id: user.id,
        doctor_id: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });

      if (error) throw error;

      toast.success('Appointment booked successfully');
      navigate('/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Select a Doctor</h2>
          <DoctorSelect
            doctors={doctors}
            selectedDoctor={selectedDoctor}
            onSelectDoctor={setSelectedDoctor}
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }, (_, i) => {
              const date = addDays(new Date(), i);
              const dateStr = format(date, 'yyyy-MM-dd');
              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    selectedDate === dateStr
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Calendar className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-medium">{format(date, 'EEE')}</div>
                  <div className="text-sm text-gray-600">
                    {format(date, 'MMM d')}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
          <TimeSlotSelect
            timeSlots={AVAILABLE_TIMES}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </section>

        <button
          type="submit"
          disabled={!selectedDoctor || !selectedDate || !selectedTime}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}