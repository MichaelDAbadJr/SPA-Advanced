import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;

// so fetcher should basically be used when ever you wanna triggger
// an action, or also a loader, with help of the load function w/o
// actually navigating to the page to which the loader belongs or
// to the page to which the action belongs.

// using default Form from react-router-dom without fetcher, when
// you are on the home page, or events page, you
// will be forwarded to the events page after submitting
// which is not the behavior you want .

// now if you use fetcher, you don't move to a different route
// can get feedback by using other properties like data, state etc

// so useFetcher is the tool you should use if you wanna trigger
// a loader or an action without actually loading the page
// the route for which this acction or loader belongs.
// and it works perfectly here where you might have some shared
// component or a component that's used multiple times on the
// same page and where you just wanna update or get some
// data behind the scenes

