import twilio from 'twilio';

export const sendSMS = async () => {
    const accountSid = '';
    const authToken = '';
    
    const client = twilio(accountSid, authToken);
  
    await client.messages.create({
      body: "Prueba Coder Backend II",
      from:"",
      to:""
    })
  } 