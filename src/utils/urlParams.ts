
import { useSearchParams, useNavigate } from 'react-router-dom';

export const useUrlParams = () => {
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  
  const getFilterParams = () => {
    return {
      search: searchParams.get('search') || '',
      consultationMode: searchParams.get('consultationMode') || '',
      specialties: searchParams.getAll('specialty') || [],
      sortBy: searchParams.get('sortBy') || '',
    };
  };

  const updateParams = (params: {
    search?: string;
    consultationMode?: string;
    specialties?: string[];
    sortBy?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Update search param
    if (params.search !== undefined) {
      if (params.search) {
        newParams.set('search', params.search);
      } else {
        newParams.delete('search');
      }
    }
    
    // Update consultation mode
    if (params.consultationMode !== undefined) {
      if (params.consultationMode) {
        newParams.set('consultationMode', params.consultationMode);
      } else {
        newParams.delete('consultationMode');
      }
    }
    
    // Update specialties (multi-select)
    if (params.specialties !== undefined) {
      newParams.delete('specialty');
      params.specialties.forEach(specialty => {
        if (specialty) {
          newParams.append('specialty', specialty);
        }
      });
    }
    
    // Update sort option
    if (params.sortBy !== undefined) {
      if (params.sortBy) {
        newParams.set('sortBy', params.sortBy);
      } else {
        newParams.delete('sortBy');
      }
    }
    
    navigate(`?${newParams.toString()}`, { replace: true });
  };

  return {
    getFilterParams,
    updateParams,
  };
};
