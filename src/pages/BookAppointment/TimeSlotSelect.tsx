interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotSelectProps {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export default function TimeSlotSelect({
  timeSlots,
  selectedTime,
  onSelectTime,
}: TimeSlotSelectProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {timeSlots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => slot.available && onSelectTime(slot.time)}
          disabled={!slot.available}
          className={`p-2 rounded text-center transition-colors ${
            selectedTime === slot.time
              ? 'bg-blue-500 text-white'
              : slot.available
              ? 'bg-white hover:bg-blue-50 border border-gray-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
}