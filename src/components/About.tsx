import { motion } from "framer-motion";
import { Award, Clock, Users, Wrench } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const stats = [
    { icon: Clock, label: "Years of Experience", value: "25+" },
    { icon: Users, label: "Happy Customers", value: "10K+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Wrench, label: "Clocks Repaired", value: "50K+" },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About Amiri
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 1998, Amiri has been at the forefront of horological excellence for over two decades. 
              Our passion for timepieces drives us to curate the finest collection of clocks, from vintage 
              antiques to modern masterpieces.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Every clock in our collection tells a story, and our expert craftsmen ensure that each timepiece 
              maintains its accuracy and beauty for generations to come. We believe that time is precious, 
              and our clocks are designed to honor that belief.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-4">
                    <CardContent className="p-0">
                      <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=400&fit=crop"
                alt="Amiri workshop"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-xl border"
            >
              <p className="text-sm text-muted-foreground mb-2">Master Craftsman</p>
              <h3 className="font-semibold text-lg">Ahmed Amiri</h3>
              <p className="text-sm text-muted-foreground">Founder & Horologist</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}