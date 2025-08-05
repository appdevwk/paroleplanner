import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

// Alarm sound (public domain short beep)
const ALARM_SRC = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa73b3.mp3";

// Simple demo: one event with a due date
const DUE_DATE = new Date('2025-08-03T12:00:00'); // Set this as desired

const App: React.FC = () => {
  const [alert, setAlert] = useState<string>('');
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  // Check if event is past due
  const now = new Date();
  const isPastDue = now > DUE_DATE;

  // Play the alarm on mount if past due
  React.useEffect(() => {
    if (isPastDue && alarmRef.current) {
      alarmRef.current.play().catch(() => {});
      setAlert('Event is past due!');
    }
  }, [isPastDue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert('Submitted!');
    setTimeout(() => setAlert(''), 2000);
  };

  return (
    <div
      style={{
        background: 'black',
        minHeight: '100vh',
        paddingTop: '5vh',
        color: 'white'
      }}
    >
      <div className="container">
        <h1>WI Parole Reminder Demo</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Pay supervision fee"
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#ff69b4', // Hot pink
              color: 'white',
              fontWeight: 'bold',
              border: 'none'
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn ms-2"
            style={{
              backgroundColor: '#ff69b4', // Hot pink
              color: 'white',
              fontWeight: 'bold',
              border: 'none'
            }}
          >
            Enter
          </button>
        </form>

        {alert && (
          <div
            className="mt-4"
            style={{
              color: 'red',
              fontWeight: 'bold',
              fontSize: '1.5rem'
            }}
          >
            {alert}
          </div>
        )}

        {/* Alarm sound (hidden audio element) */}
        <audio
          ref={alarmRef}
          src={ALARM_SRC}
          preload="auto"
        />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

