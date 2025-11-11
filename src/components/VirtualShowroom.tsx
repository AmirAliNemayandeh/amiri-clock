import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Eye, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "./CartContext";

interface Clock3D {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  tag: string;
  specifications: { label: string; value: string }[];
}

export function VirtualShowroom() {
  const [selectedClock, setSelectedClock] = useState<Clock3D | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const virtualClocks: Clock3D[] = [
    {
      id: 1,
      name: "Royal Grandfather Clock",
      price: "$3,299",
      tag: "Premium",
      description: "An exquisite handcrafted grandfather clock with intricate woodwork and premium brass fittings.",
      images: [
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594736797933-d0b3b3e14c20?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611127404924-cd62211fcc60?w=600&h=600&fit=crop"
      ],
      specifications: [
        { label: "Height", value: "84 inches" },
        { label: "Material", value: "Mahogany Wood" },
        { label: "Movement", value: "Mechanical" },
        { label: "Chimes", value: "Westminster" },
        { label: "Warranty", value: "5 Years" }
      ]
    },
    {
      id: 2,
      name: "Modern Minimalist Wall Clock",
      price: "$449",
      tag: "Contemporary",
      description: "A sleek and modern wall clock perfect for contemporary spaces with silent quartz movement.",
      images: [
        "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1594736797933-d0b3b3e14c20?w=600&h=600&fit=crop"
      ],
      specifications: [
        { label: "Diameter", value: "24 inches" },
        { label: "Material", value: "Brushed Steel" },
        { label: "Movement", value: "Silent Quartz" },
        { label: "Power", value: "Battery" },
        { label: "Warranty", value: "2 Years" }
      ]
    },
    {
      id: 3,
      name: "Vintage Cuckoo Clock",
      price: "$1,899",
      tag: "Traditional",
      description: "Authentic Black Forest cuckoo clock with traditional wooden craftsmanship and mechanical movement.",
      images: [
        "https://images.unsplash.com/photo-1611127404924-cd62211fcc60?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=600&h=600&fit=crop"
      ],
      specifications: [
        { label: "Height", value: "16 inches" },
        { label: "Material", value: "Black Forest Wood" },
        { label: "Movement", value: "Mechanical Cuckoo" },
        { label: "Origin", value: "Germany" },
        { label: "Warranty", value: "3 Years" }
      ]
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedClock) return;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedClock) return;
    const deltaX = e.movementX;
    setRotation(prev => prev + deltaX * 0.5);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation(0);
    setZoom(1);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedClock) return;
    setCurrentImageIndex(prev => (prev + 1) % selectedClock.images.length);
  };

  const prevImage = () => {
    if (!selectedClock) return;
    setCurrentImageIndex(prev => prev === 0 ? selectedClock.images.length - 1 : prev - 1);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !selectedClock) return;
      const deltaX = e.movementX;
      setRotation(prev => prev + deltaX * 0.5);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, selectedClock]);

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
            Virtual Showroom
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience our premium timepieces in 360° detail. Rotate, zoom, and explore every intricate detail.
          </p>
        </motion.div>

        {!selectedClock ? (
          /* Clock Selection Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {virtualClocks.map((clock, index) => (
              <motion.div
                key={clock.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedClock(clock);
                  resetView();
                }}
              >
                <Card className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={clock.images[0]}
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
                      className="absolute inset-0 bg-primary/80 flex items-center justify-center"
                    >
                      <Button variant="secondary" size="lg">
                        <Eye className="h-4 w-4 mr-2" />
                        View in 3D
                      </Button>
                    </motion.div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{clock.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{clock.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{clock.price}</span>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: clock.id,
                            name: clock.name,
                            price: clock.price,
                            image: clock.images[0],
                            description: clock.description
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* 3D Viewer */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 3D Viewer */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Move3D className="h-5 w-5 text-primary" />
                        <span>360° View</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={prevImage}>
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {currentImageIndex + 1} / {selectedClock.images.length}
                        </span>
                        <Button variant="outline" size="sm" onClick={nextImage}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div 
                      ref={containerRef}
                      className="relative h-96 bg-gradient-to-b from-muted/20 to-muted/40 flex items-center justify-center cursor-grab active:cursor-grabbing"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                      <motion.div
                        style={{
                          transform: `rotateY(${rotation}deg) scale(${zoom})`,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative"
                      >
                        <ImageWithFallback
                          src={selectedClock.images[currentImageIndex]}
                          alt={selectedClock.name}
                          className="w-80 h-80 object-cover rounded-lg shadow-2xl"
                          draggable={false}
                        />
                      </motion.div>
                      
                      {/* Controls Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-lg p-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                          >
                            <ZoomOut className="h-4 w-4" />
                          </Button>
                          <div className="w-20">
                            <Slider
                              value={[zoom]}
                              onValueChange={(value) => setZoom(value[0])}
                              min={0.5}
                              max={2}
                              step={0.1}
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                          >
                            <ZoomIn className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetView}
                          className="bg-background/90 backdrop-blur-sm"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Product Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{selectedClock.name}</CardTitle>
                        <Badge className="mb-2">{selectedClock.tag}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClock(null)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{selectedClock.description}</p>
                    
                    <div className="text-3xl font-bold text-primary">
                      {selectedClock.price}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => addToCart({
                          id: selectedClock.id,
                          name: selectedClock.name,
                          price: selectedClock.price,
                          image: selectedClock.images[0],
                          description: selectedClock.description
                        })}
                      >
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full">
                        Request Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Specifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedClock.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}