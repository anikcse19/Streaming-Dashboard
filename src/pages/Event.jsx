"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../componentscomponents/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../componentscomponents/ui/table";
import { Button } from "../componentscomponents/ui/button";
import { Trash2, PlusCircle, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../componentscomponents/ui/dialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEventsApi } from "../services/useEventsApi";
import { FaRegTrashCan } from "react-icons/fa6";
import Pagination from "../components/dashboard/Pagination";

const Event = () => {
  const {
    events,
    deleteEvent,
    addEvent,
    deleteAllEvents,
    currentPage,
    setCurrentPage,
  } = useEventsApi();

  const [open, setOpen] = useState(false);
  const [anotherSport, setAnotherSport] = useState(false);

  const initialFormState = {
    isPopular: false,
    event_name: "",
    event_time: new Date(),
    hlsLink: "",
    posters: "",
    event_id: "",
    platform: "",
    sport_name: "",
  };

  const [eventData, setEventData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sport_name") {
      // From dropdown
      if (value === "others") {
        setAnotherSport(true);
        setEventData((prev) => ({
          ...prev,
          sport_name: "", // allow custom input
        }));
      } else {
        setAnotherSport(false); // only if selecting from dropdown
        setEventData((prev) => ({
          ...prev,
          sport_name: value,
        }));
      }
      return;
    }

    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addEvent(eventData);

    // Reset all except platform, sport_name, and event_time
    setEventData((prev) => ({
      ...initialFormState,
      platform: prev.platform,
      sport_name: prev.sport_name,
      event_time: prev.event_time,
      event_id: generateRandomId(),
    }));

    setAnotherSport(eventData.sport_name === "others");
  };

  const handleClose = () => {
    // Reset all except platform, sport_name, and event_time
    setEventData((prev) => ({
      ...initialFormState,
      platform: prev.platform,
      sport_name: prev.sport_name,
      event_time: prev.event_time,
    }));

    setOpen(false);
    setAnotherSport(eventData.sport_name === "others");
  };

  const generateRandomId = () =>
    Math.random().toString(36).substr(2, 10).toUpperCase();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0B1D51]">Events</h2>
        <div className="flex items-center gap-6">
          <Dialog
            open={open}
            onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (isOpen) {
                // Generate ID when modal opens
                setEventData((prev) => ({
                  ...prev,
                  event_id: generateRandomId(),
                }));
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[1200px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div className="w-full flex items-center gap-6">
                  <div className="w-1/2 relative">
                    <label className="block mb-1 font-medium">Event Id</label>
                    <input
                      type="text"
                      name="event_id"
                      value={eventData.event_id}
                      onChange={handleChange}
                      placeholder="Event Id"
                      className="border p-2 w-full pr-20"
                      maxLength={10}
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-7 bg-blue-600 text-white px-1 py-1 rounded text-xs"
                      onClick={() =>
                        setEventData((prev) => ({
                          ...prev,
                          event_id: generateRandomId(),
                        }))
                      }
                    >
                      Generate
                    </button>
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">Event Name</label>
                    <input
                      type="text"
                      name="event_name"
                      value={eventData.event_name}
                      onChange={handleChange}
                      placeholder="Event Name"
                      className="border p-2 w-full"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">
                      Platform Name
                    </label>
                    <select
                      onChange={handleChange}
                      value={eventData.platform}
                      className="border p-2 w-full"
                      name="platform"
                    >
                      <option value="">Select Platform</option>
                      <option value="app">App</option>
                      <option value="web">Web</option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">Sport Name</label>

                    {anotherSport ? (
                      <input
                        type="text"
                        name="sport_name"
                        value={eventData.sport_name}
                        onChange={(e) =>
                          setEventData((prev) => ({
                            ...prev,
                            sport_name: e.target.value,
                          }))
                        }
                        placeholder="Enter custom sport name"
                        className="border p-2 w-full"
                      />
                    ) : (
                      <select
                        name="sport_name"
                        value={eventData.sport_name}
                        onChange={handleChange}
                        className="border p-2 w-full"
                      >
                        <option value="">Select Event</option>
                        <option value="all_popular_tv">All Popular Tv</option>
                        <option value="all_cricket_match">
                          All Cricket Match
                        </option>
                        <option value="all_soccer_match">
                          All Soccer Match
                        </option>
                        <option value="others">Others</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">HLS Link</label>
                    <input
                      type="text"
                      name="hlsLink"
                      value={eventData.hlsLink}
                      onChange={handleChange}
                      placeholder="HLS Link"
                      className="border p-2 w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">
                      Poster Link
                    </label>
                    <input
                      type="text"
                      name="posters"
                      value={eventData.posters}
                      onChange={handleChange}
                      placeholder="Poster Image URL"
                      className="border p-2 w-full"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center gap-6">
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">
                      Event Date & Time
                    </label>
                    <DatePicker
                      selected={eventData.event_time}
                      onChange={(date) =>
                        setEventData((prev) => ({ ...prev, event_time: date }))
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="border p-2 px-8 w-full"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-1 font-medium">Popular?</label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isPopular"
                        checked={eventData.isPopular}
                        onChange={handleChange}
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-300 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteAllEvents()}
          >
            <FaRegTrashCan />
            Delete all
          </Button>
        </div>
      </div>

      <Card className="dark:bg-[#293549]">
        <CardHeader>
          <CardTitle>Event List</CardTitle>
          <CardDescription>Showing {events.length} event(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Platform</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Event Time</TableHead>
                  <TableHead>Has Link</TableHead>
                  <TableHead>Poster</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.allEvents?.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.platform}</TableCell>
                    <TableCell>
                      {event.isPopular === "1" ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>{event.sport_name}</TableCell>
                    <TableCell>{event.event_name}</TableCell>
                    <TableCell>
                      {new Date(event.event_time).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {event.hlsLink ? (
                        <a
                          href={event.hlsLink}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink />
                        </a>
                      ) : (
                        "No Link"
                      )}
                    </TableCell>
                    <TableCell>
                      <img
                        src={event.posters}
                        alt={event.event_name}
                        className="w-16 h-10 object-cover"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteEvent(event._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        total={events?.total}
        limit={events?.limit}
      />
    </div>
  );
};

export default Event;
