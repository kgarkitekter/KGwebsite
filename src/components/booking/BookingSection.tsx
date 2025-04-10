
'use client'

import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { format, addDays, setHours, setMinutes, isSameDay } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useLanguage } from '@/context/LanguageContext'
import { Mail, Calendar, Clock, X, Check } from 'lucide-react'
// Email service will be implemented later
// import { sendBookingConfirmationEmail } from '@/components/email/EmailService'

// Import the CSS for the date picker
import 'react-datepicker/dist/react-datepicker.css'

interface TimeSlot {
  id: string
  date: Date
  available: boolean
}

const BookingSection = () => {
  const { t, language } = useLanguage()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  })

  // Fetch projects from JSON file
  useEffect(() => {
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
        // This is just to demonstrate data fetching, we don't use projects in this component
        console.log('Projects data loaded successfully');
      })
      .catch(error => {
        console.error('Error loading projects:', error);
      });
  }, [])
  
  // Generate available time slots for the selected date
  // In a real application, these would come from a backend API
  const generateTimeSlots = (date: Date | null): TimeSlot[] => {
    if (!date) return []
    
    const slots: TimeSlot[] = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Add two slots per hour (on the hour and half past)
      const slotOnHour = setMinutes(setHours(new Date(date), hour), 0)
      const slotHalfHour = setMinutes(setHours(new Date(date), hour), 30)
      
      // Randomly set some slots as unavailable to simulate a real booking system
      slots.push({
        id: `slot-${hour}-00`,
        date: slotOnHour,
        available: Math.random() > 0.3 // 70% chance of being available
      })
      
      slots.push({
        id: `slot-${hour}-30`,
        date: slotHalfHour,
        available: Math.random() > 0.3 // 70% chance of being available
      })
    }
    
    return slots
  }
  
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []
  
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }
  
  const handleTimeSelection = (slot: TimeSlot) => {
    setSelectedTime(slot)
    setBookingModalOpen(true)
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real application, this would send the booking data to a backend API
    // and sync with a calendar system
    
    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Date and time must be selected');
      }
      
      // Prepare booking details
      const bookingDetails = {
        date: selectedDate,
        time: selectedTime.date,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message
      };
      
      // Email functionality will be implemented later
      // const emailSent = await sendBookingConfirmationEmail(
      //   bookingDetails,
      //   language as 'en' | 'sv'
      // );
      
      // if (!emailSent) {
      //   throw new Error('Failed to send confirmation email');
      // }
      
      // Log success for demonstration purposes
      console.log('Booking confirmed:', bookingDetails);
      
      // In a production environment, we would also:
      // 1. Save the booking to a database
      // 2. Add the appointment to the architect's calendar
      // 3. Generate actual cancellation/reschedule tokens
      
      // Set email sent status for UI display
      setEmailSent(true);
      
      // Set booking confirmed after successful submission
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Error confirming booking:', error);
      // Handle error (would show error message to user)
    }
  }
  
  // Filter out weekends and past dates
  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6 // 0 is Sunday, 6 is Saturday
  }
  
  const today = new Date()
  
  return (
    <section id="booking" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{t('booking.title')}</h2>
        <p className="text-muted-foreground mb-8">{t('booking.subtitle')}</p>
        
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Left side - Calendar */}
          <div className="md:w-1/2 p-6 border-r">
            <h3 className="text-xl font-medium mb-4">{t('booking.calendar.title')}</h3>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                minDate={today}
                maxDate={addDays(today, 30)}
                filterDate={isWeekday}
                calendarClassName="!bg-background !border-0 text-lg"
                dayClassName={date => 
                  isSameDay(date, selectedDate as Date) 
                    ? "!bg-primary !text-primary-foreground rounded-full" 
                    : "hover:bg-gray-100 rounded-full"
                }
                wrapperClassName="calendar-large"
              />
            </div>
          </div>
          
          {/* Right side - Time slots and booking info */}
          <div className="md:w-1/2 p-6 bg-gray-50">
            <h3 className="text-xl font-medium mb-4">{t('booking.timeslots.title')}</h3>
            {selectedDate ? (
              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <p className="font-medium">{selectedDate.toDateString()}</p>
                  </div>
                  
                  {timeSlots.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map(slot => (
                        <Button
                          key={slot.id}
                          variant={slot.available ? "outline" : "ghost"}
                          disabled={!slot.available}
                          className={`${
                            selectedTime?.id === slot.id ? 'border-primary bg-primary/10 text-primary font-medium' : ''
                          } ${!slot.available ? 'opacity-40' : 'hover:bg-primary/5'} transition-all duration-200`}
                          onClick={() => slot.available && handleTimeSelection(slot)}
                        >
                          {format(slot.date, 'h:mm a')}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p>No available slots for this date.</p>
                  )}
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    {t('booking.consultationInfo')}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Consultations typically last 45-60 minutes</li>
                    <li>• Discuss your project ideas and requirements</li>
                    <li>• Explore design possibilities and solutions</li>
                    <li>• Receive preliminary cost and timeline estimates</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center h-64">
                <Calendar className="h-12 w-12 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-center">{t('booking.timeslots.empty')}</p>
                <p className="text-sm text-muted-foreground text-center mt-2">{t('booking.selectDate')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <Dialog open={bookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('booking.title')}</DialogTitle>
            <DialogDescription>
              {selectedTime && (
                <span>
                  {format(selectedDate as Date, 'EEEE, MMMM d, yyyy')} at {format(selectedTime.date, 'h:mm a')}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {bookingConfirmed ? (
            <div className="py-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">{t('booking.confirmed')}</h3>
              
              {emailSent ? (
                <div>
                  <div className="flex items-center justify-center mb-2">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <p className="text-muted-foreground">
                      {t('booking.emailSent')}
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md text-left mb-4">
                    <h4 className="font-medium mb-2">{t('booking.emailDetails')}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Calendar className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>{t('booking.appointmentDetails')} {format(selectedDate as Date, 'MMMM d, yyyy')} at {format(selectedTime?.date as Date, 'h:mm a')}</span>
                      </li>
                      <li className="flex items-start">
                        <X className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>{t('booking.cancelLink')}</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-1 text-primary" />
                        <span>{t('booking.rescheduleOption')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">
                  Your consultation has been scheduled. A confirmation email has been sent to {formData.email}.
                </p>
              )}
              
              <Button onClick={() => {
                setBookingModalOpen(false)
                setBookingConfirmed(false)
                setEmailSent(false)
                setSelectedDate(null)
                setSelectedTime(null)
                setFormData({name: '', email: '', phone: '', projectType: '', message: ''})
              }}>
                {t('booking.done')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">{t('booking.name')}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{t('booking.email')}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-2 border rounded-md"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">{t('booking.phone')}</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="projectType" className="text-sm font-medium">{t('booking.project.label')}</label>
                <input
                  id="projectType"
                  name="projectType"
                  type="text"
                  required
                  placeholder={t('booking.project.placeholder')}
                  className="w-full p-2 border rounded-md"
                  value={formData.projectType}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">{t('booking.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full p-2 border rounded-md"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setBookingModalOpen(false)}>
                  {t('booking.cancel')}
                </Button>
                <Button type="submit">
                  {t('booking.submit')}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default BookingSection


const handleBookingSubmit = async () => {
  const bookingDetails = {
    name,
    email,
    date,
    time,
    message,
  };

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails),
    });

    const result = await response.json();
    if (result.status === 'ok') {
      alert('Booking submitted! Check your email for confirmation.');
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (err) {
    console.error('Submit error:', err);
    alert('Error submitting booking.');
  }
};
