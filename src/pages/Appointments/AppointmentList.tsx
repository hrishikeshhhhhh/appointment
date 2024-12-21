import { format } from 'date-fns';
import { Appointment } from '../../types';
import AppointmentCard from './AppointmentCard';

interface AppointmentListProps {
  appointments: Appointment[];
}

export default function AppointmentList({ appointments }: AppointmentListProps) {
  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) >= new Date()
  );
  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.date) < new Date()
  );

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No appointments found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {upcomingAppointments.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        </section>
      )}

      {pastAppointments.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}