// components/Appointment.js
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

const Appointment = () => {
  const { data: session } = useSession();
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    description: '',
    start: '',
    end: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const createEvent = async () => {
    if (!session) return;

    const response = await fetch('/api/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventDetails, accessToken: session.accessToken }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      {!session && <button onClick={() => signIn('google')}>Sign in with Google</button>}
      {session && (
        <>
          <button onClick={() => signOut()}>Sign out</button>
          <div>
            <input type="text" name="summary" placeholder="Summary" onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" onChange={handleChange} />
            <input type="datetime-local" name="start" onChange={handleChange} />
            <input type="datetime-local" name="end" onChange={handleChange} />
            <button onClick={createEvent}>Create Event</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointment;
