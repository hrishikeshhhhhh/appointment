import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {appointment.doctor?.name}
          </h3>
          <p className="text-gray-600 mb-4">
            {appointment.doctor?.specialization}
          </p>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(appointment.date), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {format(new Date(`2000-01-01T${appointment.time}`), 'h:mm a')}
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[appointment.status]
          }`}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>
    </div>
  );
}