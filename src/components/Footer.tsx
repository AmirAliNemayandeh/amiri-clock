import { motion } from "framer-motion";
import {
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Clocks", href: "#clocks" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Clock Repair", href: "#" },
    { name: "Custom Design", href: "#" },
    { name: "Appraisal", href: "#" },
    { name: "Installation", href: "#" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Amiri</h3>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Your trusted partner for exceptional timepieces since 1998. We
              blend traditional craftsmanship with modern innovation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <motion.a
                    href={service.href}
                    whileHover={{ x: 5 }}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors cursor-pointer">
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-foreground/80" />
                <div>
                  <p className="text-primary-foreground/80 text-sm">
                    Iran
                    <br />
                    Yazd EmamShahr
                    <br />
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">
                  +989913703869
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-foreground/80" />
                <p className="text-primary-foreground/80 text-sm">
                  a.namayande3869@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="bg-primary-foreground/20 my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 Amiri Clock Shop. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <span className="text-primary-foreground/40">|</span>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <span className="text-primary-foreground/40">|</span>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="text-primary-foreground/80 text-sm">
            AmirAli Nemayandeh
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
