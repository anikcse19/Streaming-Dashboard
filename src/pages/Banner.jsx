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
import "react-datepicker/dist/react-datepicker.css";

const mockEvents = [
  {
    _id: "68513e2cc5a50c67288e372c",
    posters: "https://filedn.com/ll5zNusm7Pak5IjUJ9hlXGm/live-cricket.png",
  },
];

const Banner = () => {
      const [events, setEvents] = useState(mockEvents);
      const [open, setOpen] = useState(false); // control Dialog
      const initialFormState = {
        posters: "",
      };
      const [eventData, setEventData] = useState(initialFormState);
      const handleDelete = (id) => {
        setEvents(events.filter((event) => event._id !== id));
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEventData((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Event Submitted:", eventData);
    
    
        // Clear form and close modal
        setEventData(initialFormState);
        setOpen(false);
      };
    
      const handleClose = () => {
        setEventData(initialFormState);
        setOpen(false);
      };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#0B1D51]">Banners</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <input
                type="text"
                name="posters"
                value={eventData.posters}
                onChange={handleChange}
                placeholder="Poster Image URL"
                className="border p-2 w-full"
              />

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

                  <TableHead>Poster</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event._id}>
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

export default Banner;
