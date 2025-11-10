"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Property, PropertyFilters as Filters, PropertyView } from "@/types/property";
import PropertyDetailCard from "@/components/ui/PropertyDetailCard";
import PropertyFilters from "@/components/ui/PropertyFilters";
import SearchBar from "@/components/ui/SearchBar";
import HeroBanner from "@/components/ui/HeroBanner";

interface SearchResponse {
  properties: Property[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

function ForRentContent() {
  const searchParams = useSearchParams();
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<PropertyView>("grid");
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // URL parametrelerini filtre olarak ayarla
  useEffect(() => {
    const urlFilters: Filters = {};
    
    if (searchParams.get('category')) urlFilters.category = searchParams.get('category') as any;
    if (searchParams.get('city')) urlFilters.city = searchParams.get('city')!;
    if (searchParams.get('district')) urlFilters.district = searchParams.get('district')!;
    if (searchParams.get('minPrice')) urlFilters.minPrice = Number(searchParams.get('minPrice'));
    if (searchParams.get('maxPrice')) urlFilters.maxPrice = Number(searchParams.get('maxPrice'));
    if (searchParams.get('rooms')) urlFilters.rooms = searchParams.get('rooms')!;
    if (searchParams.get('minSize')) urlFilters.minSize = Number(searchParams.get('minSize'));
    if (searchParams.get('maxSize')) urlFilters.maxSize = Number(searchParams.get('maxSize'));
    if (searchParams.get('kitchenType')) urlFilters.kitchenType = searchParams.get('kitchenType')!;
    if (searchParams.get('heatingType')) urlFilters.heatingType = searchParams.get('heatingType')!;
    if (searchParams.get('hasParking') === 'true') urlFilters.hasParking = true;
    if (searchParams.get('hasElevator') === 'true') urlFilters.hasElevator = true;
    if (searchParams.get('isFurnished') === 'true') urlFilters.isFurnished = true;
    if (searchParams.get('hasBalcony') === 'true') urlFilters.hasBalcony = true;
    if (searchParams.get('inSite') === 'true') urlFilters.inSite = true;
    if (searchParams.get('creditEligible') === 'true') urlFilters.creditEligible = true;
    if (searchParams.get('exchangeAvailable') === 'true') urlFilters.exchangeAvailable = true;
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search')!);

    setFilters(urlFilters);
  }, [searchParams]);

  // MongoDB'den property'leri ara
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Arama parametrelerini oluştur
        const queryParams = new URLSearchParams();
        
        // Kiralık filtresi sabit
        queryParams.append('type', 'rent');
        
        // Diğer filtrelerden parametreleri ekle
        if (filters.category) queryParams.append('category', JSON.stringify(filters.category));
        if (filters.city) queryParams.append('city', filters.city);
        if (filters.district) queryParams.append('district', filters.district);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters.rooms) queryParams.append('rooms', filters.rooms);
        if (filters.minSize) queryParams.append('minSize', filters.minSize.toString());
        if (filters.maxSize) queryParams.append('maxSize', filters.maxSize.toString());
        if (filters.kitchenType) queryParams.append('kitchenType', filters.kitchenType);
        if (filters.heatingType) queryParams.append('heatingType', filters.heatingType);
        if (filters.furnishing) queryParams.append('furnishing', filters.furnishing);
        if (filters.hasParking) queryParams.append('hasParking', 'true');
        if (filters.hasElevator) queryParams.append('hasElevator', 'true');
        if (filters.isFurnished) queryParams.append('isFurnished', 'true');
        if (filters.hasBalcony) queryParams.append('hasBalcony', 'true');
        if (filters.inSite) queryParams.append('inSite', 'true');
        if (filters.creditEligible) queryParams.append('creditEligible', 'true');
        if (filters.exchangeAvailable) queryParams.append('exchangeAvailable', 'true');
        if (searchQuery.trim()) queryParams.append('search', searchQuery.trim());
        
        // Sayfalama
        queryParams.append('page', currentPage.toString());
        queryParams.append('limit', '12');

        const response = await fetch(`/api/search?${queryParams.toString()}`);
        if (response.ok) {
          const data: SearchResponse = await response.json();
          setSearchResponse(data);
        } else {
          console.error('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Emlaklar yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters, searchQuery, currentPage]);

  // Dinamik şehir ve ilçe listeleri için
  const cities = searchResponse?.properties ? 
    Array.from(new Set(searchResponse.properties.map((p) => p.location.city))) : [];
  const districts = filters.city && searchResponse?.properties ?
    Array.from(
      new Set(
        searchResponse.properties
          .filter((p) => p.location.city === filters.city)
          .map((p) => p.location.district)
          .filter((district): district is string => district !== undefined)
      )
    ) : [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroBanner
        title="Kiralık Emlak Portföyü"
        subtitle="Konforlu yaşam alanlarını keşfedin"
        images={[
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1920&h=1080&fit=crop",
          "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1920&h=1080&fit=crop"
        ]}
        stats={[
          { label: "Kiralık İlan", value: searchResponse?.pagination.totalResults || 0 },
          { label: "Farklı Şehir", value: cities.length },
          { label: "Müşteri Memnuniyeti", value: "98%" }
        ]}
      />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar
              onSearch={setSearchQuery}
              initialValue={searchQuery}
              placeholder="İlan no, konut tipi veya lokasyon ara..."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-6">
                <PropertyFilters
                  initialFilters={filters}
                  onFilterChange={setFilters}
                  cities={cities}
                  districts={districts}
                />
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-9">
              {/* Controls */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {searchResponse?.pagination.totalResults || 0} ilan bulundu
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="newest">En Yeni</option>
                    <option value="price_asc">Fiyat (Düşük-Yüksek)</option>
                    <option value="price_desc">Fiyat (Yüksek-Düşük)</option>
                    <option value="size_desc">Büyükten Küçüğe</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        view === "grid"
                          ? "bg-gray-800 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        view === "list"
                          ? "bg-gray-800 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Display */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Emlaklar yükleniyor...</p>
                </div>
              ) : !searchResponse?.properties || searchResponse.properties.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Aradığınız kriterlerde emlak bulunamadı
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Filtrelerinizi değiştirerek tekrar deneyin
                  </p>
                </div>
              ) : (
                <div className={`grid gap-8 ${
                  view === "grid" 
                    ? "grid-cols-1 xl:grid-cols-2" 
                    : "grid-cols-1"
                }`}>
                  {searchResponse.properties.map((property) => (
                    <PropertyDetailCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ForRentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <ForRentContent />
    </Suspense>
  );
}
