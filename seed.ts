// src/constants/seed.ts
import { add, differenceInCalendarDays } from 'date-fns';
import { STANDARD_RULES } from './rules';

export interface Task {
  id: string;
  title: string;
  due: string;       // ISO date
  remindOffsets: number[]; // days before due
  recurrent?: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
}

/* Utility to build YYYY-MM-DD date strings */
const iso = (d: Date) => d.toISOString().split('T')[0];

/* Today */
const start = new Date('2025-08-05');

/* Hard-wired statutory items -------------------------------------------- */
export const seed: Task[] = [
  /* Monthly supervision-fee payment (Cat 1–3 fee brackets) */
  { id: 'fee', title: 'Pay DOC supervision fee',
    due: iso(start), recurrent: 'monthly', remindOffsets: [7,3,1] },

  /* Six-month risk/needs reassessment DOC policy[33] */
  { id: 'risk-reval', title: 'DOC risk/needs re-assessment interview',
    due: iso(add(start,{months:6})), recurrent: 'half-yearly', remindOffsets:[14,7,1] },

  /* Annual case-plan review */
  { id: 'annual-plan', title: 'Annual case-plan review w/ agent',
    due: iso(add(start,{years:1})), recurrent:'yearly', remindOffsets:[30,7,1] },

  /* Travel-permit renewal reminder (only if agent previously granted travel privileges) */
  { id: 'travel-permit', title: 'Renew interstate travel permit if needed',
    due: iso(add(start,{months:11})), recurrent:'yearly', remindOffsets:[21,7,1] }
];

/* ----------------------------------------------------------------------- */
/* Agent-modifiable additional goals for this user ----------------------- */
export const individualPlan: Task[] = [
  { id:'df-cert', title:'Complete digital-forensics graduate certificate',
    due: iso(add(start,{years:2})), remindOffsets:[90,30,7] },

  { id:'aoda', title:'Finish AODA Level 2 therapy block (16 sessions)',
    due: iso(add(start,{months:20})), remindOffsets:[14,7,1] },

  { id:'restitution', title:'Restitution paid-in-full ($12,800 balance)',
    due: iso(add(start,{years:3})), remindOffsets:[60,30,7] }
];
