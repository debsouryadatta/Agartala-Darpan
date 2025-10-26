import PdfManagement from "@/components/pdf-management"
import ContactMessages from "@/components/contact-messages"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
   return (
      <div className="flex flex-col gap-6 w-full">
         <div className="flex flex-col gap-2">
            <h2 className="bengali-serif text-3xl font-bold tracking-tight text-burgundy">
               জনতার ভাষা - Admin Dashboard
            </h2>
            <p className="font-inter text-charcoal/70">
               Manage E-Paper Publications & Messages
            </p>
         </div>

         <Tabs defaultValue="epapers" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
               <TabsTrigger value="epapers" className="font-inter">
                  E-Papers
               </TabsTrigger>
               <TabsTrigger value="messages" className="font-inter">
                  Contact Messages
               </TabsTrigger>
            </TabsList>

            <TabsContent value="epapers" className="mt-0">
               <PdfManagement />
            </TabsContent>

            <TabsContent value="messages" className="mt-0">
               <ContactMessages />
            </TabsContent>
         </Tabs>
      </div>
   )
}

