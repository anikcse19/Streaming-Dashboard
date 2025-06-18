import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const baseURL = "https://testapi.epickstream.online";

export const useEventsApi = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("stream-token");
  const getEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/admin/events/event`, {
        headers: {
        //   "x-api-key": "665544332211",
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`
        },
      });
      setEvents(res?.data?.data?.allEvents || []);
      console.log("useApi",events)
     
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {


    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    try {
      const payload = {
        ...eventData,
        isPopular: eventData.isPopular ? "1" : "0",
        event_time: eventData.event_time.toISOString(),
      };

      const res = await axios.post(
        `${baseURL}/api/admin/events/event/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
console.log(res)
      toast.success(res.data?.message || "Event added successfully");
      getEvents(); // Refresh event list
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add event");
    }
  };
  const deleteAllEvents = async () => {
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }
console.log("Api delete")
    try {
      await axios.delete(`${baseURL}/api/admin/events/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("All events deleted successfully");
      setEvents([]); 
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete all events"
      );
    }
  };
  const deleteEvent = async (eventId) => {
    const token = Cookies.get("stream-token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    try {
      await axios.delete(`${baseURL}/api/admin/events/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Event deleted successfully");
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete event");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return { events, loading, getEvents, addEvent, deleteEvent, deleteAllEvents };
};
