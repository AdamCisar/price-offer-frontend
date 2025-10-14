import { useEffect, useState } from "react";

export default function useBroadcast(eventName) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!navigator.serviceWorker) {
      return;
    }

    const messageHandler = (event) => {
      if (event.data.notification.title !== eventName) {
        return;
      }

      setData(event.data);
    };

    navigator.serviceWorker.addEventListener("message", messageHandler);

    return () => {
      navigator.serviceWorker.removeEventListener("message", messageHandler);
    };
  }, [eventName]);

  return data;
}
