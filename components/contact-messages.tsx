"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Trash2, CheckCircle, Circle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, isRead: boolean) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: !isRead }),
      });

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      setMessages(
        messages.map((msg) =>
          msg.id === id ? { ...msg, isRead: !isRead } : msg
        )
      );

      toast.success(isRead ? "Marked as unread" : "Marked as read");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setMessages(messages.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete message");
    }
  };

  const unreadCount = messages.filter((msg) => !msg.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 bg-white shadow-lg border-taupe">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal/60 font-inter mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-burgundy">{messages.length}</p>
            </div>
            <Mail className="w-10 h-10 text-burgundy/30" />
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-taupe">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal/60 font-inter mb-1">Unread</p>
              <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
            </div>
            <Circle className="w-10 h-10 text-orange-600/30" />
          </div>
        </Card>

        <Card className="p-6 bg-white shadow-lg border-taupe">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal/60 font-inter mb-1">Read</p>
              <p className="text-3xl font-bold text-green-600">
                {messages.length - unreadCount}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600/30" />
          </div>
        </Card>
      </div>

      {/* Messages Table */}
      <Card className="p-6 bg-white shadow-lg border-taupe">
        <h3 className="font-inter text-xl font-semibold text-burgundy mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Messages
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-taupe">
                <TableHead className="font-inter text-charcoal">Status</TableHead>
                <TableHead className="font-inter text-charcoal">Name</TableHead>
                <TableHead className="font-inter text-charcoal">Email</TableHead>
                <TableHead className="font-inter text-charcoal">Subject</TableHead>
                <TableHead className="font-inter text-charcoal">Date</TableHead>
                <TableHead className="font-inter text-charcoal text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-burgundy"></div>
                      <span className="font-inter text-charcoal/60">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <Mail className="w-12 h-12 text-charcoal/30 mx-auto mb-3" />
                    <p className="font-inter text-charcoal/60">No messages yet</p>
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`border-taupe cursor-pointer hover:bg-cream/50 ${
                      !message.isRead ? "bg-orange-50/30" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <TableCell>
                      <Badge
                        variant={message.isRead ? "outline" : "default"}
                        className={
                          message.isRead
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-orange-100 text-orange-800 border-orange-300"
                        }
                      >
                        {message.isRead ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-inter font-medium">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-burgundy" />
                        {message.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-inter text-charcoal/70">
                      {message.email}
                    </TableCell>
                    <TableCell className="font-inter">
                      {message.subject || "No subject"}
                    </TableCell>
                    <TableCell className="font-inter text-charcoal/70">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-burgundy" />
                        {new Date(message.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRead(message.id, message.isRead);
                          }}
                          className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
                        >
                          {message.isRead ? (
                            <Circle className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <Card className="p-6 bg-white shadow-lg border-burgundy border-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-inter text-xl font-semibold text-burgundy">
              Message Details
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-inter text-charcoal/60 mb-1">Name</p>
                <p className="font-inter font-semibold text-charcoal">
                  {selectedMessage.name}
                </p>
              </div>
              <div>
                <p className="text-sm font-inter text-charcoal/60 mb-1">Email</p>
                <p className="font-inter text-burgundy">
                  <a href={`mailto:${selectedMessage.email}`}>
                    {selectedMessage.email}
                  </a>
                </p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <p className="text-sm font-inter text-charcoal/60 mb-1">Phone</p>
                  <p className="font-inter text-charcoal">
                    <a href={`tel:${selectedMessage.phone}`}>
                      {selectedMessage.phone}
                    </a>
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-inter text-charcoal/60 mb-1">Date</p>
                <p className="font-inter text-charcoal">
                  {new Date(selectedMessage.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {selectedMessage.subject && (
              <div>
                <p className="text-sm font-inter text-charcoal/60 mb-1">Subject</p>
                <p className="font-inter font-semibold text-charcoal">
                  {selectedMessage.subject}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm font-inter text-charcoal/60 mb-1">Message</p>
              <div className="bg-cream p-4 rounded-lg">
                <p className="font-inter text-charcoal whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => toggleRead(selectedMessage.id, selectedMessage.isRead)}
                className="bg-burgundy hover:bg-burgundy/90 text-white"
              >
                Mark as {selectedMessage.isRead ? "Unread" : "Read"}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDelete(selectedMessage.id)}
                className="border-destructive text-destructive hover:bg-destructive hover:text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}