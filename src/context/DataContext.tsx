"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Doctor,
  Service,
  GalleryItem,
  Ad,
  CreateDoctorDTO,
  UpdateDoctorDTO,
  CreateServiceDTO,
  UpdateServiceDTO,
  CreateGalleryItemDTO,
  UpdateGalleryItemDTO,
  CreateAdDTO,
  UpdateAdDTO,
} from "@/types";
import { useAuth } from "./AuthContext";
import { ref } from "node:process";

interface DataContextType {
  // Doctors
  doctors: Doctor[];
  addDoctor: (doctor: CreateDoctorDTO) => Promise<void>;
  updateDoctor: (id: number, doctor: UpdateDoctorDTO) => Promise<void>;
  toggleDoctorFeatured: (id: number, isFeatured: boolean) => Promise<void>;
  deleteDoctor: (id: number) => Promise<void>;
  refreshDoctors: () => Promise<void>;

  // Services
  services: Service[];
  addService: (service: CreateServiceDTO) => Promise<void>;
  updateService: (id: number, service: UpdateServiceDTO) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
  refreshServices: () => Promise<void>;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: CreateGalleryItemDTO) => Promise<void>;
  updateGalleryItem: (id: string, item: UpdateGalleryItemDTO) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  refreshGallery: () => Promise<void>;

  // Ads
  ads: Ad[];
  addAd: (ad: CreateAdDTO) => Promise<void>;
  updateAd: (id: string, ad: UpdateAdDTO) => Promise<void>;
  deleteAd: (id: string) => Promise<void>;
  refreshAds: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const { getAuthHeaders } = useAuth();

  // Fetch doctors from API (memoized to prevent infinite loops)
  const refreshDoctors = useCallback(async () => {
    try {
      const response = await fetch("/api/doctors");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setDoctors(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, []);

  // Fetch services from API (memoized to prevent infinite loops)
  const refreshServices = useCallback(async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setServices(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, []);

  // Fetch gallery from API (memoized to prevent infinite loops)
  const refreshGallery = useCallback(async () => {
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setGallery(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  }, []);

  // Fetch ads from API (memoized to prevent infinite loops)
  const refreshAds = useCallback(async () => {
    try {
      const response = await fetch("/api/ads", {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setAds(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  }, [getAuthHeaders]);

  // Initial data fetch on mount (only public data, not ads)
  useEffect(() => {
    refreshDoctors();
    refreshServices();
    refreshGallery();
    refreshAds();
  }, [refreshDoctors, refreshServices, refreshGallery, refreshAds]);

  // Doctor CRUD operations
  const addDoctor = async (doctor: CreateDoctorDTO) => {
    try {
      console.log("Sending doctor data:", doctor);
      const response = await fetch("/api/doctors", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(doctor),
      });

      if (response.ok) {
        await refreshDoctors();
      } else {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to add doctor (${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      throw error;
    }
  };

  const updateDoctor = async (id: number, updatedDoctor: UpdateDoctorDTO) => {
    try {
      const response = await fetch("/api/doctors", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...updatedDoctor }),
      });

      if (response.ok) {
        await refreshDoctors();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to update doctor (${response.status})`;
        console.error("API Error:", errorData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      throw error;
    }
  };

  const deleteDoctor = async (id: number) => {
    try {
      const response = await fetch(`/api/doctors?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await refreshDoctors();
      } else {
        throw new Error("Failed to delete doctor");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      throw error;
    }
  };

  const toggleDoctorFeatured = async (id: number, isFeatured: boolean) => {
    try {
      const response = await fetch("/api/doctors/featured", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, isFeatured }),
      });

      if (response.ok) {
        await refreshDoctors();
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.error || "Failed to update doctor featured status";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error toggling doctor featured status:", error);
      throw error;
    }
  };

  // Service CRUD operations
  const addService = async (service: CreateServiceDTO) => {
    try {
      console.log("Sending service data:", service);
      const response = await fetch("/api/services", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(service),
      });

      if (response.ok) {
        await refreshServices();
      } else {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to add service (${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  };

  const updateService = async (
    id: number,
    updatedService: UpdateServiceDTO,
  ) => {
    try {
      const response = await fetch("/api/services", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...updatedService }),
      });

      if (response.ok) {
        await refreshServices();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to update service (${response.status})`;
        console.error("API Error:", errorData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };

  const deleteService = async (id: number) => {
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await refreshServices();
      } else {
        throw new Error("Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  };

  // Gallery CRUD operations
  const addGalleryItem = async (item: CreateGalleryItemDTO) => {
    try {
      console.log("Sending gallery item data:", item);
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });

      if (response.ok) {
        await refreshGallery();
      } else {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error ||
            `Failed to add gallery item (${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding gallery item:", error);
      throw error;
    }
  };

  const updateGalleryItem = async (
    id: string,
    updatedItem: UpdateGalleryItemDTO,
  ) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...updatedItem }),
      });

      if (response.ok) {
        await refreshGallery();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error ||
            `Failed to update gallery item (${response.status})`;
        console.error("API Error:", errorData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await refreshGallery();
      } else {
        throw new Error("Failed to delete gallery item");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      throw error;
    }
  };

  // Ad CRUD operations
  const addAd = async (ad: CreateAdDTO) => {
    try {
      console.log("Sending ad data:", ad);
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(ad),
      });

      if (response.ok) {
        await refreshAds();
      } else {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to add ad (${response.status})`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding ad:", error);
      throw error;
    }
  };

  const updateAd = async (id: string, updatedAd: UpdateAdDTO) => {
    try {
      const response = await fetch("/api/ads", {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ id, ...updatedAd }),
      });

      if (response.ok) {
        await refreshAds();
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? `${errorData.error}: ${errorData.details.join(", ")}`
          : errorData.error || `Failed to update ad (${response.status})`;
        console.error("API Error:", errorData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating ad:", error);
      throw error;
    }
  };

  

  const deleteAd = async (id: string) => {
    try {
      const response = await fetch(`/api/ads`, {
  method: "DELETE",
  headers: {
    ...getAuthHeaders(),
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id }),
});

      if (response.ok) {
        await refreshAds();
      } else {
        throw new Error("Failed to delete ad");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        doctors,
        addDoctor,
        updateDoctor,
        toggleDoctorFeatured,
        deleteDoctor,
        refreshDoctors,
        services,
        addService,
        updateService,
        deleteService,
        refreshServices,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        refreshGallery,
        ads,
        addAd,
        updateAd,
        deleteAd,
        refreshAds,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
