import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Wrench, CheckCircle, CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Badge } from "./ui/badge";

interface TimeSlot {
  time: string;
  available: boolean;
}

export function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    clockType: "",
    issue: "",
    notes: ""
  });

  const services = [
    { value: "repair", label: "Clock Repair", duration: "1-2 hours", price: "$75-150" },
    { value: "maintenance", label: "Maintenance Service", duration: "30-60 mins", price: "$50-100" },
    { value: "restoration", label: "Antique Restoration", duration: "2-4 hours", price: "$200-500" },
    { value: "appraisal", label: "Clock Appraisal", duration: "30 mins", price: "$75" },
    { value: "consultation", label: "Design Consultation", duration: "45 mins", price: "$100" },
  ];

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "1:00 PM", available: false },
    { time: "2:00 PM", available: true },
    { time: "3:00 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "5:00 PM", available: false },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-primary mb-4">
                Appointment Confirmed!
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Thank you for booking with Amiri. We've sent a confirmation email to {formData.email}.
              </p>
              
              <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-4">Appointment Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span>{services.find(s => s.value === selectedService)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{services.find(s => s.value === selectedService)?.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full">
                  Add to Calendar
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Book Another Appointment
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Book an Appointment
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a consultation or repair service with our expert horologists. We're here to help keep your timepieces running perfectly.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <span>Select Service</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedService === service.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedService(service.value)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{service.label}</h4>
                        <Badge variant="outline">{service.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Duration: {service.duration}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Your Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clockType">Clock Type</Label>
                    <Input
                      id="clockType"
                      placeholder="e.g., Grandfather clock, Wall clock, Mantle clock"
                      value={formData.clockType}
                      onChange={(e) => handleInputChange("clockType", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="issue">Issue Description</Label>
                    <Textarea
                      id="issue"
                      placeholder="Describe the problem or service needed..."
                      value={formData.issue}
                      onChange={(e) => handleInputChange("issue", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span>Select Date</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border w-full"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Select Time</span>
                  </CardTitle>
                  {selectedDate && (
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedDate)}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        type="button"
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="h-12"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special requests or additional information..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!selectedService || !selectedDate || !selectedTime || !formData.firstName || !formData.email}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
              </motion.div>
            </motion.div>
          </form>
      </div>
      </div>
      </section>
    )
}