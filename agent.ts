// src/agent.ts
import { Task } from './constants/seed';

/* low-risk supervisees: face-to-face every 90 d DHS 98.04(2)(p)[44] */
export const addContactSchedule=(risk:'low'|'med'|'high', anchor:Date):Task=>{
  const freq={low:'quarterly',med:'monthly',high:'monthly'}[risk] as Task['recurrent'];
  return {
    id:`contact-${risk}`,
    title:`Face-to-face agent contact (${risk} risk)`,
    due:anchor.toISOString().split('T')[0],
    recurrent:freq,
    remindOffsets:[7,1]
  };
};
