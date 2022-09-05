import { Router } from 'express';

const router = Router();

import {
  getCalendars,
  getCalendarByID,
  createCalendar,
  updateCalendarByID,
  deleteCalendarByID,
} from '../controllers/calendar.controllers';

router.get('/:userId', getCalendars);
router.get('/:calendarId', getCalendarByID);
router.post('/', createCalendar);
router.put('/:calendarId', updateCalendarByID);
router.delete('/:calendarId', deleteCalendarByID);

export default router;
