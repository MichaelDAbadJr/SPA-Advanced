import { json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
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
    return response;
  }
}

// json is a function that creates a response object that
// includes data in the json format. to this json function
// you simply pass your data that should be included in your
// response, in my case my object, and you don't need to
// convert it to json manually instead it will be done for you
//
