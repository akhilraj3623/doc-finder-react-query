
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSectionProps {
  consultationMode: string;
  setConsultationMode: (mode: string) => void;
  specialties: string[];
  availableSpecialties: string[];
  setSpecialties: (specialties: string[]) => void;
  sortBy: string;
  setSortBy: (option: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  consultationMode,
  setConsultationMode,
  specialties,
  availableSpecialties,
  setSpecialties,
  sortBy,
  setSortBy,
}) => {
  const handleSpecialtyChange = (specialty: string) => {
    if (specialties.includes(specialty)) {
      setSpecialties(specialties.filter(item => item !== specialty));
    } else {
      setSpecialties([...specialties, specialty]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium mb-3">Sort by</h3>
        <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fees" id="sort-fees" data-testid="sort-fees" />
            <Label htmlFor="sort-fees">Fees: Low-High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience" id="sort-experience" data-testid="sort-experience" />
            <Label htmlFor="sort-experience">Experience: Most Experience first</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="font-medium mb-3">Filters</h3>
        <h4 className="text-sm text-gray-600 mb-2">Specialties</h4>
        <div className="space-y-2">
          {availableSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={`specialty-${specialty}`}
                checked={specialties.includes(specialty)}
                onCheckedChange={() => handleSpecialtyChange(specialty)}
                data-testid={`filter-${specialty.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <Label htmlFor={`specialty-${specialty}`}>{specialty}</Label>
            </div>
          ))}
        </div>

        <h4 className="text-sm text-gray-600 mt-4 mb-2">Mode of consultation</h4>
        <RadioGroup value={consultationMode} onValueChange={setConsultationMode} className="space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video-consult" data-testid="filter-video-consult" />
            <Label htmlFor="video-consult">Video Consultation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clinic" id="in-clinic" data-testid="filter-in-clinic" />
            <Label htmlFor="in-clinic">In Clinic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="" id="all-modes" />
            <Label htmlFor="all-modes">All</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterSection;
