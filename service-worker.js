self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Time Event Reminder';
  const options = {
    body: data.body || 'You have a new time event.',
    icon: data.icon || 'icon-192.png',
    badge: data.badge || 'icon-192.png',
    vibrate: [100, 50, 100],
    data: data.url || '/'
  };
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(clientList => {
      for (const client of clientList) {
        if (client.url === event.notification.data && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data);
      }
    })
  );
});
