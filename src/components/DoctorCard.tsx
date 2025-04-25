
import React from "react";
import { Doctor } from "@/types/doctor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="mb-4 overflow-hidden" data-testid="doctor-card">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {doctor.imageUrl ? (
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg" data-testid="doctor-name">{doctor.name}</h3>
                <p className="text-gray-500" data-testid="doctor-specialty">
                  {doctor.specialty.join(", ")}
                </p>
                {doctor.qualification && (
                  <p className="text-gray-500 text-sm">{doctor.qualification}</p>
                )}
                <p className="mt-1" data-testid="doctor-experience">
                  <span className="font-medium">{doctor.experience} yrs exp.</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg" data-testid="doctor-fee">
                  ₹ {doctor.fees}
                </p>
              </div>
            </div>
            
            {(doctor.clinic || doctor.location) && (
              <div className="mt-2 text-sm text-gray-600">
                {doctor.clinic && (
                  <p className="flex items-center">
                    <span className="mr-1">🏥</span> {doctor.clinic}
                  </p>
                )}
                {doctor.location && (
                  <p className="flex items-center">
                    <span className="mr-1">📍</span> {doctor.location}
                  </p>
                )}
              </div>
            )}
            
            <div className="mt-3">
              <Button className="w-full bg-white text-primary hover:bg-primary/10 border border-primary">
                Book Appointment
              </Button>
            </div>
          </div>
          
          <div className="ml-2">
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
