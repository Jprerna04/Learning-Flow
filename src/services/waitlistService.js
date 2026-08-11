const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbwahIcJOW78L6dTO8IgcSWru4vdM4KIqpykO1zXE-rMcgd5H9bj4nh6KNDK7jljLACqlw/exec";

/**
 * Submits user waitlist registration.
 * Prepared for future Node.js/Express + MongoDB backend integration.
 * 
 * @param {Object} data - { name, email, phone, role }
 * @returns {Promise<boolean>}
 */
export async function submitWaitlist(data) {
  const entry = {
    ...data,
    ts: new Date().toISOString()
  };

  if (SHEET_ENDPOINT && SHEET_ENDPOINT.indexOf('PASTE_YOUR') === -1) {
    await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(entry)
    });
  }

  return true;
}
