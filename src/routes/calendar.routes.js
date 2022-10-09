import { Router } from 'express';
import { verifyToken } from '../middlewares/authJwt.js';

const router = Router();

import {
  getCalendars,
  getCalendarByID,
  createCalendar,
  updateCalendarByID,
  deleteCalendarByID,
} from '../controllers/calendar.controllers';

router.get('/:userId', [verifyToken], getCalendars);
router.get('/:calendarId', [verifyToken], getCalendarByID);
router.post('/', [verifyToken], createCalendar);
router.put('/:calendarId', [verifyToken], updateCalendarByID);
router.delete('/:calendarId', [verifyToken], deleteCalendarByID);

export default router;
