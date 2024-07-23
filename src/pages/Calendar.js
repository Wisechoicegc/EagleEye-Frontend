import React, { useState, Fragment } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, Transition } from '@headlessui/react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 1,
    title: 'Sample Event',
    start: new Date(),
    end: new Date(),
    comments: 'Sample comments',
    status: 'pending',
  },
];

const BookingModal = ({ isOpen, eventDetails, onClose, onSave, onDelete, onMarkComplete }) => {
  const [title, setTitle] = useState(eventDetails?.title || '');
  const [time, setTime] = useState(eventDetails ? moment(eventDetails.start).format('HH:mm') : '');
  const [comments, setComments] = useState(eventDetails?.comments || '');

  const handleSave = () => {
    const updatedEvent = {
      ...eventDetails,
      title,
      start: new Date(eventDetails.start.setHours(time.split(':')[0], time.split(':')[1])),
      end: new Date(eventDetails.start.setHours(time.split(':')[0], time.split(':')[1])),
      comments,
    };
    onSave(updatedEvent);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-boxdark dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {eventDetails ? 'Edit Event' : 'Book a Meeting'}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {eventDetails
                      ? `Edit the event on ${moment(eventDetails.start).format('MMMM Do YYYY')}`
                      : `Book a meeting on ${eventDetails?.start.toLocaleDateString()}`}
                  </p>
                </div>
                <form>
                  <div className="mt-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-boxdark dark:border-strokedark dark:text-white"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    ></textarea>
                  </div>
                </form>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  {eventDetails && (
                    <>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                        onClick={() => onMarkComplete(eventDetails)}
                      >
                        Mark Complete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => onDelete(eventDetails)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSave}
                  >
                    {eventDetails ? 'Save' : 'Create'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const EventOptionsModal = ({ isOpen, events, onClose, onSelectEvent, onAddNew }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-boxdark dark:text-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
              >
                Select an Option
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This date has multiple bookings. Would you like to edit an existing booking or add a new one?
                </p>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                {events.map((event, index) => (
                  <button
                    key={index}
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => onSelectEvent(event)}
                  >
                    Edit: {event.title}
                  </button>
                ))}
                <button
                  className="w-full rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                  onClick={onAddNew}
                >
                  Add New Booking
                </button>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);

const CalendarPage = () => {
  const [eventsData, setEventsData] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openOptionsModal = () => setIsOptionsModalOpen(true);
  const closeOptionsModal = () => setIsOptionsModalOpen(false);

  const handleDateClick = (slotInfo) => {
    const bookingsOnDate = eventsData.filter(
      (event) =>
        moment(event.start).isSame(slotInfo.start, 'day') &&
        moment(event.end).isSame(slotInfo.end, 'day')
    );

    if (bookingsOnDate.length > 0) {
      setCurrentDate(slotInfo.start);
      openOptionsModal();
    } else {
      setSelectedEvent({ start: slotInfo.start, end: slotInfo.end });
      openModal();
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    openModal();
  };

  const handleCreateOrUpdateEvent = (event) => {
    setEventsData((prevEvents) => {
      const eventIndex = prevEvents.findIndex((e) => e.id === event.id);

      if (eventIndex !== -1) {
        const updatedEvents = [...prevEvents];
        updatedEvents[eventIndex] = event;
        return updatedEvents;
      } else {
        return [...prevEvents, { ...event, id: prevEvents.length + 1 }];
      }
    });
    closeModal();
  };

  const handleDeleteEvent = (event) => {
    setEventsData((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
    closeModal();
  };

  const handleMarkComplete = (event) => {
    setEventsData((prevEvents) =>
      prevEvents.map((e) => (e.id === event.id ? { ...e, status: 'complete' } : e))
    );
    closeModal();
  };

  const handleSelectEventFromOptions = (event) => {
    setSelectedEvent(event);
    closeOptionsModal();
    openModal();
  };

  const handleAddNewBooking = () => {
    setSelectedEvent({ start: currentDate, end: currentDate });
    closeOptionsModal();
    openModal();
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <div className="container mx-auto py-4 lg:pl-10">
        <div className="p-4 bg-white dark:bg-boxdark rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Calendar</h2>
          <Calendar
            localizer={localizer}
            events={eventsData}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            className="calendar"
            onSelectSlot={handleDateClick}
            selectable
            onSelectEvent={handleEventClick}
          />
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        eventDetails={selectedEvent}
        onClose={closeModal}
        onSave={handleCreateOrUpdateEvent}
        onDelete={handleDeleteEvent}
        onMarkComplete={handleMarkComplete}
      />
      <EventOptionsModal
        isOpen={isOptionsModalOpen}
        events={eventsData.filter(
          (event) =>
            moment(event.start).isSame(currentDate, 'day') &&
            moment(event.end).isSame(currentDate, 'day')
        )}
        onClose={closeOptionsModal}
        onSelectEvent={handleSelectEventFromOptions}
        onAddNew={handleAddNewBooking}
      />
    </>
  );
};

export default CalendarPage;
