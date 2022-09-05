import Calendar from '../models/Calendar';

export  const createCalendar = async (req, res)=>{
  const {title, backgroundColor, start, end, user}=req.body;
  const newCalendar = new Calendar({title, backgroundColor, start, end, user});
  const calendarSaved = await newCalendar.save();
  res.status(201).json(calendarSaved);
};

export  const getCalendars = async (req, res)=>{
  const { userId } = req.params;
  const calendar = await Calendar.find({ user: { $in: userId } });
  res.status(201).json(calendar);

};

export  const getCalendarByID = async (req, res)=>{
  const { calendarId } = req.params;
  const calendar = await Calendar.findById(calendarId);
  res.status(200).json(calendar);
};

export  const updateCalendarByID = async (req, res)=>{
  const { calendarId } = req.params;
  const updatedCalendar = await Calendar.findByIdAndUpdate(calendarId, req.body,{
    new:true
  });
  res.status(200).json(updatedCalendar);
};

export  const deleteCalendarByID = async (req, res)=>{
  const { calendarId } = req.params;
  await Calendar.findByIdAndDelete(calendarId);
  res.status(204).json();  
};