
import React, { useEffect, useState } from "react";
import { fetchDoctors } from "@/services/doctorService";
import { useUrlParams } from "@/utils/urlParams";
import { Doctor } from "@/types/doctor";
import SearchBar from "@/components/SearchBar";
import FilterSection from "@/components/FilterSection";
import DoctorCard from "@/components/DoctorCard";

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);
  
  const { getFilterParams, updateParams } = useUrlParams();
  const { search, consultationMode, specialties, sortBy } = getFilterParams();

  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        
        // Extract unique specialties
        const allSpecialties = new Set<string>();
        data.forEach(doctor => {
          doctor.specialty.forEach(spec => allSpecialties.add(spec));
        });
        setAvailableSpecialties(Array.from(allSpecialties).sort());
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (doctors.length === 0) return;
    
    let results = [...doctors];
    
    // Apply search filter
    if (search) {
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply consultation mode filter
    if (consultationMode) {
      results = results.filter(doctor => 
        doctor.consultationMode.includes(consultationMode as 'video' | 'clinic')
      );
    }
    
    // Apply specialty filters
    if (specialties.length > 0) {
      results = results.filter(doctor => 
        specialties.some(specialty => doctor.specialty.includes(specialty))
      );
    }
    
    // Apply sorting
    if (sortBy === 'fees') {
      results.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === 'experience') {
      results.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredDoctors(results);
  }, [doctors, search, consultationMode, specialties, sortBy]);

  const handleSearchChange = (value: string) => {
    updateParams({ search: value });
  };

  const handleConsultationModeChange = (mode: string) => {
    updateParams({ consultationMode: mode });
  };

  const handleSpecialtiesChange = (selected: string[]) => {
    updateParams({ specialties: selected });
  };

  const handleSortChange = (option: string) => {
    updateParams({ sortBy: option });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <header className="bg-primary text-white py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              doctors={doctors} 
              value={search} 
              onChange={handleSearchChange} 
            />
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters - Left Column */}
            <div className="md:col-span-1">
              <FilterSection 
                consultationMode={consultationMode}
                setConsultationMode={handleConsultationModeChange}
                specialties={specialties}
                availableSpecialties={availableSpecialties}
                setSpecialties={handleSpecialtiesChange}
                sortBy={sortBy}
                setSortBy={handleSortChange}
              />
            </div>
            
            {/* Doctor List - Right Column */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-pulse">Loading doctors...</div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                  {error}
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="bg-white p-8 rounded-md text-center">
                  <h3 className="text-lg font-medium">No doctors found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-gray-600">{filteredDoctors.length} doctors found</p>
                  {filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
