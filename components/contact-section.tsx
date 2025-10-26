"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, User, Facebook, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে!", {
        description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="w-full py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="bengali-serif text-4xl md:text-5xl font-bold text-burgundy mb-3">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="bengali-text text-lg text-charcoal/70">
            Get In Touch
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Contact Information */}
          <Card className="p-8 space-y-6 bg-white shadow-lg border-taupe">
            <div className="space-y-6">
              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-charcoal mb-1">
                    Office Address
                  </h3>
                  <p className="bengali-text text-charcoal/70">
                    কুঞ্জাবন কলোনি, আগরতলা, পশ্চিম ত্রিপুরা ৭৯৯০০৫
                  </p>
                  <p className="font-inter text-sm text-charcoal/70">
                    Kunjaban Colony, P.O-Abhoynagar, Agartala, West Tripura 799005
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-charcoal mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:agtdarpan16@gmail.com"
                    className="text-burgundy hover:underline font-inter"
                  >
                    agtdarpan16@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-charcoal mb-1">
                    Phone
                  </h3>
                  <a
                    href="tel:+919774842294"
                    className="text-burgundy hover:underline font-inter"
                  >
                    +91 9774842294 (Mobile) | 0381 359 6723 (Landline)
                  </a>
                </div>
              </div>

              {/* Editor */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-burgundy" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-charcoal mb-1">
                    Publication
                  </h3>
                  <p className="font-inter text-charcoal/70">Agartala Darpan (আগরতলা দৰ্পণ)</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-taupe">
                <h3 className="font-inter font-semibold text-charcoal mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center hover:bg-burgundy hover:text-white text-burgundy transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center hover:bg-burgundy hover:text-white text-burgundy transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </Card>

          {/* Right Column - Contact Form */}
          <Card className="p-8 bg-white shadow-lg border-taupe">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-inter text-charcoal">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-taupe focus:border-burgundy focus:ring-burgundy"
                  placeholder="আপনার নাম"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-inter text-charcoal">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-taupe focus:border-burgundy focus:ring-burgundy"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-inter text-charcoal">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-taupe focus:border-burgundy focus:ring-burgundy"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-inter text-charcoal">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-taupe focus:border-burgundy focus:ring-burgundy"
                  placeholder="Subject of your message"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="font-inter text-charcoal">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="border-taupe focus:border-burgundy focus:ring-burgundy resize-none"
                  placeholder="আপনার বার্তা লিখুন..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-burgundy hover:bg-burgundy/90 text-white py-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 font-inter"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}