export function handleAuthClick(data) {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    await listUpcomingEvents();
    await addEvent(data);
  };
  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

export async function addEvent(data) {

  const date = data.data.event_date;
  const startTime = data.data.start_time;
  const startDateTime = date + 'T' + startTime;
  const endTime = data.data.end_time;
  const endDateTime = date + 'T' + endTime;

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
  };

  try {
    const response = await gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event
    });
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
    console.error(err);
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {

    return;
  }
  const output = events.reduce(
    (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    'Events:\n');
}

export function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');


  }
}


