import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { useCart } from "./CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ShoppingCart() {
  const {
    state,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                {getTotalItems() > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add some beautiful timepieces to get started
                  </p>
                  <Button onClick={closeCart}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm mb-1 truncate">
                                {item.name}
                              </h4>
                              <p className="text-muted-foreground text-xs mb-3">
                                {item.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }>
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }>
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm">
                                    {formatPrice(
                                      parseFloat(
                                        item.price
                                          .replace("$", "")
                                          .replace(",", "")
                                      ) * item.quantity
                                    )}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => removeFromCart(item.id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Checkout */}
            {state.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout • Free shipping on orders over $500
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
