import Echo from "laravel-echo";
import Pusher from "pusher-js";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "reverb",
  key: process.env.REACT_APP_REVERB_APP_KEY,
  wsHost: process.env.REACT_APP_REVERB_HOST,
  wsPort: process.env.REACT_APP_REVERB_PORT,
  wssPort: process.env.REACT_APP_REVERB_PORT,
  forceTLS: (process.env.REACT_APP_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});

const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.REACT_APP_BEAMS_INSTANCE_ID,
});

beamsClient.start()
  .then(() => beamsClient.addDeviceInterest('item-price-update'))
  .then(() => console.log('Successfully registered and subscribed!'))
  .catch(console.error);