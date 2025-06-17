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
import { Trash2, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../componentscomponents/ui/dialog";
import { Input } from "../componentscomponents/ui/input";
import { Label } from "../componentscomponents/ui/label";

const mockEvents = [
  {
    _id: "68513e2cc5a50c67288e372c",
    platform: "app",
    isPopular: "0",
    sport_name: "Live sports_2025",
    event_id: "010101",
    event_name: "Live Sports 2025",
    event_time: "2025-06-22T12:21:00.000Z",
    hlsLink:
      "https://st3.1ten.live/memfs/5f70b812-e7af-4004-ab0c-75c00b7654d0.m3u8",
    posters: "https://filedn.com/ll5zNusm7Pak5IjUJ9hlXGm/live-cricket.png",
  },
];

const Event = () => {
  const [events, setEvents] = useState(mockEvents);
  const [newEvent, setNewEvent] = useState({
    platform: "",
    isPopular: "",
    sport_name: "",
    event_name: "",
    event_time: "",
    hlsLink: "",
    posters: "",
  });

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event._id !== id));
  };

  const handleAddEvent = () => {
    const newId = Math.random().toString(36).substring(2);
    setEvents([...events, { _id: newId, ...newEvent }]);
    setNewEvent({
      platform: "",
      isPopular: "",
      sport_name: "",
      event_name: "",
      event_time: "",
      hlsLink: "",
      posters: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0B1D51]">Events</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {Object.keys(newEvent).map((field) => (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  key={field}
                >
                  <Label htmlFor={field} className="capitalize">
                    {field}
                  </Label>
                  <Input
                    id={field}
                    className="col-span-3"
                    value={newEvent[field]}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <Button onClick={handleAddEvent}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
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
                {events.map((event) => (
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
                          View Link
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
                        onClick={() => handleDelete(event._id)}
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
    </div>
  );
};

export default Event;
