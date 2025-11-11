import { motion } from "framer-motion";
import { Clock, Wrench, Palette, ShoppingBag, Award, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Services() {
  const services = [
    {
      icon: ShoppingBag,
      title: "Clock Sales",
      description: "Extensive collection of vintage, modern, and antique clocks from renowned manufacturers worldwide.",
      color: "text-blue-500"
    },
    {
      icon: Wrench,
      title: "Clock Repair",
      description: "Expert restoration and repair services for all types of timepieces with original parts when possible.",
      color: "text-green-500"
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Bespoke clock design services tailored to your specific requirements and aesthetic preferences.",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Appraisal",
      description: "Professional clock appraisal services for insurance, estate, or resale purposes by certified experts.",
      color: "text-orange-500"
    },
    {
      icon: Clock,
      title: "Maintenance",
      description: "Regular maintenance programs to keep your timepieces running accurately for years to come.",
      color: "text-red-500"
    },
    {
      icon: Truck,
      title: "Installation",
      description: "Professional installation services for large clocks, including mounting and setup in your space.",
      color: "text-teal-500"
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From sales to restoration, we offer comprehensive clock services to meet all your timepiece needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full bg-card hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto mb-4"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                  </motion.div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-primary/5 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              We understand that every timepiece is unique. Contact us to discuss your specific requirements 
              and let our experts create a tailored solution for you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Custom Quote
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}