// public/sw.js
self.addEventListener('notificationclick', evt=>{
  evt.notification.close();
  /* Focus existing tab or open new */
  evt.waitUntil(
    clients.matchAll({type:'window'}).then(c=>{
      for(const win of c) if(win.url.endsWith('/') && 'focus' in win) return win.focus();
      if(clients.openWindow) return clients.openWindow('/');
    })
  );
});
