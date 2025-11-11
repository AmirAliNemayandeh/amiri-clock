import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";
import { toast } from "sonner";

export function FeaturedClocks() {
  const { addToCart } = useCart();

  const clocks = [
    {
      id: 1,
      name: "Vintage Grandfather Clock",
      price: "$2,499",
      image:
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
      tag: "Classic",
      description: "Handcrafted mahogany with brass pendulum",
    },
    {
      id: 2,
      name: "Modern Wall Clock",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=400&fit=crop",
      tag: "Contemporary",
      description: "Minimalist design with silent movement",
    },
    {
      id: 3,
      name: "Antique Mantle Clock",
      price: "$899",
      image:
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=400&h=400&fit=crop",
      tag: "Antique",
      description: "Restored Victorian era masterpiece",
    },
    {
      id: 4,
      name: "Swiss Cuckoo Clock",
      price: "$1,299",
      image:
        "https://images.unsplash.com/photo-1611127404924-cd62211fcc60?w=400&h=400&fit=crop",
      tag: "Traditional",
      description: "Authentic Black Forest craftsmanship",
    },
    {
      id: 5,
      name: "Digital Smart Clock",
      price: "$199",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      tag: "Smart",
      description: "Connected features with weather display",
    },
    {
      id: 6,
      name: "Art Deco Table Clock",
      price: "$599",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0b3b3e14c20?w=400&h=400&fit=crop",
      tag: "Designer",
      description: "Geometric patterns in brass and marble",
    },
  ];

  const handleAddToCart = (clock: (typeof clocks)[0]) => {
    addToCart({
      id: clock.id,
      name: clock.name,
      price: clock.price,
      image: clock.image,
      description: clock.description,
    });

    toast.success(`${clock.name} added to cart!`, {
      description: `${clock.price} • Click cart to view`,
      duration: 3000,
    });
  };

  return (
    <section id="clocks" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Featured Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of timepieces, each telling
            its own story of craftsmanship and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clocks.map((clock, index) => (
            <motion.div
              key={clock.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group">
              <Card className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}>
                    <ImageWithFallback
                      src={clock.image}
                      alt={clock.name}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {clock.tag}
                    </Badge>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-2">
                    <Button variant="secondary" size="lg">
                      View Details
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(clock);
                      }}>
                      Quick Add
                    </Button>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{clock.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {clock.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {clock.price}
                    </span>
                    <Button size="sm" onClick={() => handleAddToCart(clock)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
