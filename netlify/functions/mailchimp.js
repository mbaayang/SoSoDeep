const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
  
  const response = await fetch(`https://us20.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `apikey ${process.env.MAILCHIMP_API_KEY}`
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed' // ou 'pending' pour double opt-in
    })
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data)
  };
};