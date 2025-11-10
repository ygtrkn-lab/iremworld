"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/property";
import PropertyHero from "@/components/ui/property/PropertyHero";
import PropertyGallery from "@/components/ui/property/PropertyGallery";
import PropertyContent from "@/components/ui/property/PropertyContent";
import PropertyLoading from "@/components/ui/property/PropertyLoading";
import PropertyError from "@/components/ui/property/PropertyError";

export default function SalePropertyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/properties/slug/${slug}`);
      
      if (!response.ok) {
        throw new Error("Property not found");
      }

      const data = await response.json();
      setProperty(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PropertyLoading />;
  }

  if (error || !property) {
    return <PropertyError error={error || "Property not found"} type="sale" />;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PropertyHero property={property} type="sale" />
      <PropertyGallery images={property.images} />
      <div ref={contentRef}>
        <PropertyContent property={property} type="sale" isVisible={isVisible} />
      </div>
    </main>
  );
}

