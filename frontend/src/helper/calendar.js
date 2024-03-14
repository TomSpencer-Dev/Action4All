export function handleAuthClick(data) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    await listUpcomingEvents();
    await addEvent(data);
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

export async function addEvent(data) {
console.log(data);
  const date = data.data.event_date;
  const startTime = data.data.start_time;
  const startDateTime = date + 'T' + startTime;
  const endTime = data.data.end_time;
  const endDateTime = date + 'T' + endTime;
console.log(endDateTime);
  const event = {
    'summary': data.data.event_name,
    'location': data.data.event_address,
    'description': data.data.event_details,
    'start': {
      'dateTime': startDateTime,
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': endDateTime,
      'timeZone': 'America/Los_Angeles'
    },
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees': [
    //   { 'email': 'lpage@example.com' },
    //   { 'email': 'sbrin@example.com' }
    // ],
    // 'reminders': {
    //   'useDefault': false,
    //   'overrides': [
    //     { 'method': 'email', 'minutes': 24 * 60 },
    //     { 'method': 'popup', 'minutes': 10 }
    //   ]
    // }
  };

  try {
    const response = await gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });

    console.log('Event created: ', response.result.htmlLink);
  } catch (error) {
    console.error('Error adding event: ', error);
  }
}


export async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    // document.getElementById('content').innerText = err.message;
    console.log(err);
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    // document.getElementById('content').innerText = 'No events found.';
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
    (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    'Events:\n');
  console.log(output);


}

export function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');

    console.log("User Signed Out");
  }
}


