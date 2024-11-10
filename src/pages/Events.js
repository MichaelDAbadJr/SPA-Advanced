import { json, useLoaderData, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...defer</p>}>
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}
export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events'};
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500
    // });
    return (
      json({ message: 'Could not fetch events.' }),
      {
        status: 500
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents()
  });
}

// json is a function that creates a response object that
// includes data in the json format. to this json function
// you simply pass your data that should be included in your
// response, in my case my object, and you don't need to
// convert it to json manually instead it will be done for you
