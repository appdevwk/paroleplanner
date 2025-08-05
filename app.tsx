// src/App.tsx
import React, { useEffect, useState } from 'react';
import { differenceInCalendarDays, add } from 'date-fns';
import { seed, individualPlan, Task } from './constants/seed';
import { v4 as uuid } from 'uuid';
import { registerSW } from 'virtual:pwa-register';

const STORAGE_KEY = 'wi-parole-tasks';

const nextOccurrence = (task: Task): string => {
  if (!task.recurrent) return task.due;
  const unit = { monthly: 'months',
                 quarterly: 'months',
                 'half-yearly': 'months',
                 yearly: 'years' }[task.recurrent] as
                 'months'|'years';
  const step = { monthly:1, quarterly:3, 'half-yearly':6, yearly:1 }[task.recurrent];
  let date = new Date(task.due);
  while (date < new Date()) date = add(date,{[unit]:step});
  return date.toISOString().split('T')[0];
};

export default function App() {
  const [tasks,setTasks] = useState<Task[]>([]);

  /* one-time seed on first launch */
  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) setTasks(JSON.parse(raw));
    else {
      const init = [...seed,...individualPlan]
        .map(t=>({...t, id: uuid()}));
      setTasks(init); localStorage.setItem(STORAGE_KEY,JSON.stringify(init));
    }
  },[]);

  /* register service worker for notifications */
  useEffect(()=>{ registerSW({onNeedRefresh(){},onOfflineReady(){}}); },[]);

  /* schedule notifications whenever task list changes */
  useEffect(()=>{
    tasks.forEach(t=>{
      const due = new Date(nextOccurrence(t));
      const ms = t.remindOffsets
        .map(d=>differenceInCalendarDays(due,new Date())-d)
        .map(delta=>delta*24*3600*1000)
        .filter(m=>m>0);
      ms.forEach(offset=>{
        navigator.serviceWorker.ready.then(reg=>{
          reg.showNotification(t.title,{
            tag:`${t.id}-${offset}`,
            body:`Due on ${due.toDateString()}`,
            showTrigger: new TimestampTrigger(Date.now()+offset)
          });
        });
      });
    });
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
  },[tasks]);

  return (
    <main>
      <h1>WI Parole Planner (2025-2028)</h1>
      <ul>
        {tasks.map(t=>{
          const next = nextOccurrence(t);
          return <li key={t.id}>
            <strong>{t.title}</strong><br/>
            Next due&nbsp;<time dateTime={next}>{next}</time>
          </li>;
        })}
      </ul>
    </main>
  );
}
