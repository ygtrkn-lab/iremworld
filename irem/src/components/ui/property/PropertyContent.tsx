"use client";

import { useState, useEffect } from "react";
import { Property } from "@/types/property";
import { formatLocation } from "@/lib/client-utils";

interface PropertyContentProps {
  property: Property;
  type: "sale" | "rent";
  isVisible: boolean;
}

export default function PropertyContent({
  property,
  type,
  isVisible,
}: PropertyContentProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const renderFeatureList = (
    features: Array<{ label: string; value: any; condition?: boolean }>
  ) => {
    return features
      .filter((item) => item.condition !== false && item.value)
      .map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
          <span className="text-gray-600 text-sm">{item.label}</span>
          <span className="font-medium text-gray-900 text-sm">{item.value}</span>
        </div>
      ));
  };

  const renderBooleanFeatures = (
    features: Array<{ label: string; condition: boolean }>
  ) => {
    return features
      .filter((item) => item.condition)
      .map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
        >
          <span className="text-gray-600 text-sm">{item.label}</span>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      ));
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Property Header */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {property.title}
                  </h1>
                  <div className="flex items-center mt-1 text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm">
                      {formatLocation(property.location)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {property.price.toLocaleString("tr-TR")} ₺
                  </div>
                  {type === "rent" && (
                    <div className="text-gray-600 text-sm">aylık</div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Açıklama
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {property.category.main === "Arsa" ? (
                <>
                  {/* Land Features */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {property.category.sub} Özellikleri
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {renderFeatureList([
                        {
                          label: "İmar Durumu",
                          value: property.landDetails?.zoningStatus,
                        },
                        {
                          label: "m²",
                          value: property.specs?.netSize
                            ? `${property.specs.netSize.toLocaleString(
                                "tr-TR"
                              )} m²`
                            : null,
                        },
                        {
                          label: "m² Fiyatı",
                          value: property.landDetails?.pricePerSquareMeter
                            ? `${property.landDetails.pricePerSquareMeter.toLocaleString(
                                "tr-TR"
                              )} ₺`
                            : null,
                        },
                        {
                          label: "Ada No",
                          value: property.landDetails?.blockNumber,
                        },
                        {
                          label: "Parsel No",
                          value: property.landDetails?.parcelNumber,
                        },
                        {
                          label: "Pafta No",
                          value: property.landDetails?.sheetNumber ||
                            "Belirtilmemiş",
                        },
                        {
                          label: "Kaks (Emsal)",
                          value: property.landDetails?.floorAreaRatio ||
                            "Belirtilmemiş",
                        },
                        {
                          label: "Gabari",
                          value: property.landDetails?.buildingHeight ||
                            "Belirtilmemiş",
                        },
                        {
                          label: "Krediye Uygunluk",
                          value: property.landDetails?.creditEligibility,
                        },
                      ])}
                    </div>
                  </div>

                  {/* Land Details */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {property.category.sub} Detayları
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {renderFeatureList([
                        {
                          label: "Tapu Durumu",
                          value: property.propertyDetails?.deedStatus ||
                            "Müstakil Tapulu",
                        },
                        {
                          label: "Kimden",
                          value: property.propertyDetails?.fromWho ||
                            "Emlak Ofisinden",
                        },
                      ])}
                      {renderBooleanFeatures([
                        {
                          label: "Takas",
                          condition:
                            property.propertyDetails?.exchangeAvailable === true,
                        },
                      ])}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Specifications */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-orange-50 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Temel Özellikler
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {renderFeatureList([
                        {
                          label: "Oda Sayısı",
                          value: property.specs?.rooms,
                        },
                        {
                          label: "Banyo Sayısı",
                          value: property.specs?.bathrooms,
                        },
                        {
                          label: "Net Alan",
                          value: property.specs?.netSize
                            ? `${property.specs.netSize} m²`
                            : null,
                        },
                        {
                          label: "Brüt Alan",
                          value: property.specs?.grossSize
                            ? `${property.specs.grossSize} m²`
                            : null,
                        },
                        {
                          label: "Bina Yaşı",
                          value: property.specs?.age
                            ? `${property.specs.age} yıl`
                            : null,
                        },
                        {
                          label: "Kat",
                          value: property.specs?.floor,
                        },
                        {
                          label: "Toplam Kat",
                          value: property.specs?.totalFloors,
                        },
                        {
                          label: "Isıtma",
                          value: property.specs?.heating,
                        },
                        {
                          label: "Eşyalı Durumu",
                          value: property.specs?.furnishing,
                        },
                        {
                          label: "Balkon Sayısı",
                          value: property.specs?.balconyCount,
                        },
                      ])}
                    </div>
                  </div>

                  {/* Interior Features */}
                  {property.interiorFeatures && (
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg mr-3">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          İç Özellikler
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {renderFeatureList([
                          {
                            label: "Mutfak Tipi",
                            value: property.interiorFeatures.kitchenType,
                          },
                        ])}
                        {renderBooleanFeatures([
                          {
                            label: "Ankastre Mutfak",
                            condition:
                              property.interiorFeatures.hasBuiltInKitchen,
                          },
                          {
                            label: "Gömme Dolap",
                            condition:
                              property.interiorFeatures.hasBuiltInWardrobe,
                          },
                          {
                            label: "Laminat",
                            condition: property.interiorFeatures.hasLaminate,
                          },
                          {
                            label: "Parke",
                            condition: property.interiorFeatures.hasParquet,
                          },
                          {
                            label: "Seramik",
                            condition: property.interiorFeatures.hasCeramic,
                          },
                          {
                            label: "Mermer",
                            condition: property.interiorFeatures.hasMarble,
                          },
                          {
                            label: "Duvar Kağıdı",
                            condition: property.interiorFeatures.hasWallpaper,
                          },
                          {
                            label: "Boyalı Duvarlar",
                            condition: property.interiorFeatures.hasPaintedWalls,
                          },
                          {
                            label: "Spot Aydınlatma",
                            condition: property.interiorFeatures.hasSpotLighting,
                          },
                          {
                            label: "Hilton Banyo",
                            condition:
                              property.interiorFeatures.hasHiltonBathroom,
                          },
                          {
                            label: "Jakuzi",
                            condition: property.interiorFeatures.hasJacuzzi,
                          },
                          {
                            label: "Duşakabin",
                            condition:
                              property.interiorFeatures.hasShowerCabin,
                          },
                          {
                            label: "Amerikan Kapı",
                            condition:
                              property.interiorFeatures.hasAmericanDoor,
                          },
                          {
                            label: "Çelik Kapı",
                            condition: property.interiorFeatures.hasSteelDoor,
                          },
                          {
                            label: "Görüntülü Diafon",
                            condition: property.interiorFeatures.hasIntercom,
                          },
                        ])}
                      </div>
                    </div>
                  )}

                  {/* Exterior Features */}
                  {property.exteriorFeatures && (
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg mr-3">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Dış Özellikler
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {renderFeatureList([
                          {
                            label: "Cephe",
                            value: property.exteriorFeatures.facade,
                          },
                        ])}
                        {renderBooleanFeatures([
                          {
                            label: "Balkon",
                            condition: property.exteriorFeatures.hasBalcony,
                          },
                          {
                            label: "Teras",
                            condition: property.exteriorFeatures.hasTerrace,
                          },
                          {
                            label: "Bahçe",
                            condition: property.exteriorFeatures.hasGarden,
                          },
                          {
                            label: "Bahçe Kullanımı",
                            condition:
                              property.exteriorFeatures.hasGardenUse,
                          },
                          {
                            label: "Deniz Manzarası",
                            condition: property.exteriorFeatures.hasSeaView,
                          },
                          {
                            label: "Şehir Manzarası",
                            condition: property.exteriorFeatures.hasCityView,
                          },
                          {
                            label: "Doğa Manzarası",
                            condition: property.exteriorFeatures.hasNatureView,
                          },
                          {
                            label: "Havuz Manzarası",
                            condition: property.exteriorFeatures.hasPoolView,
                          },
                        ])}
                      </div>
                    </div>
                  )}

                  {/* Building Features */}
                  {property.buildingFeatures && (
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg mr-3">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Bina Özellikleri
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {renderBooleanFeatures([
                          {
                            label: "Asansör",
                            condition: property.buildingFeatures.hasElevator,
                          },
                          {
                            label: "Otopark",
                            condition: property.buildingFeatures.hasCarPark,
                          },
                          {
                            label: "Kapalı Otopark",
                            condition:
                              property.buildingFeatures.hasClosedCarPark,
                          },
                          {
                            label: "Açık Otopark",
                            condition:
                              property.buildingFeatures.hasOpenCarPark,
                          },
                          {
                            label: "Güvenlik",
                            condition: property.buildingFeatures.hasSecurity,
                          },
                          {
                            label: "24 Saat Güvenlik",
                            condition:
                              property.buildingFeatures.has24HourSecurity,
                          },
                          {
                            label: "Kamera Sistemi",
                            condition:
                              property.buildingFeatures.hasCameraSystem,
                          },
                          {
                            label: "Kapıcı",
                            condition: property.buildingFeatures.hasConcierge,
                          },
                          {
                            label: "Havuz",
                            condition: property.buildingFeatures.hasPool,
                          },
                          {
                            label: "Spor Salonu",
                            condition: property.buildingFeatures.hasGym,
                          },
                          {
                            label: "Sauna",
                            condition: property.buildingFeatures.hasSauna,
                          },
                          {
                            label: "Türk Hamamı",
                            condition:
                              property.buildingFeatures.hasTurkishBath,
                          },
                          {
                            label: "Çocuk Oyun Alanı",
                            condition:
                              property.buildingFeatures.hasPlayground,
                          },
                          {
                            label: "Basketbol Sahası",
                            condition:
                              property.buildingFeatures.hasBasketballCourt,
                          },
                          {
                            label: "Tenis Kortu",
                            condition:
                              property.buildingFeatures.hasTennisCourt,
                          },
                          {
                            label: "Jeneratör",
                            condition: property.buildingFeatures.hasGenerator,
                          },
                          {
                            label: "Yangın Merdiveni",
                            condition:
                              property.buildingFeatures.hasFireEscape,
                          },
                          {
                            label: "Yangın Algılama",
                            condition:
                              property.buildingFeatures.hasFireDetector,
                          },
                          {
                            label: "Su Deposu",
                            condition: property.buildingFeatures.hasWaterBooster,
                          },
                          {
                            label: "Uydu Sistemi",
                            condition:
                              property.buildingFeatures.hasSatelliteSystem,
                          },
                          {
                            label: "Kablosuz İnternet",
                            condition: property.buildingFeatures.hasWifi,
                          },
                        ])}
                      </div>
                    </div>
                  )}

                  {/* Property Details */}
                  {property.propertyDetails && (
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg mr-3">
                          <svg
                            className="w-5 h-5 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Emlak Detayları
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {renderFeatureList([
                          {
                            label: "Kullanım Durumu",
                            value: property.propertyDetails.usageStatus,
                          },
                          {
                            label: "Tapu Durumu",
                            value: property.propertyDetails.deedStatus,
                          },
                          {
                            label: "Kimden",
                            value: property.propertyDetails.fromWho,
                          },
                          {
                            label: "Aylık Aidat",
                            value: property.propertyDetails.monthlyFee
                              ? `${property.propertyDetails.monthlyFee} ₺`
                              : null,
                          },
                          {
                            label: "Borç Miktarı",
                            value: property.propertyDetails.debtAmount
                              ? `${property.propertyDetails.debtAmount} ₺`
                              : null,
                          },
                          {
                            label: "Kira Garanti Miktarı",
                            value: property.propertyDetails.rentGuaranteeAmount
                              ? `${property.propertyDetails.rentGuaranteeAmount} ₺`
                              : null,
                          },
                        ])}
                        {renderBooleanFeatures([
                          {
                            label: "İskanlı",
                            condition: property.propertyDetails.isSettlement,
                          },
                          {
                            label: "Krediye Uygun",
                            condition: property.propertyDetails.creditEligible,
                          },
                          {
                            label: "Takas Yapılır",
                            condition:
                              property.propertyDetails.exchangeAvailable,
                          },
                          {
                            label: "Site İçerisinde",
                            condition: property.propertyDetails.inSite,
                          },
                          {
                            label: "Borç Var",
                            condition: property.propertyDetails.hasDebt,
                          },
                          {
                            label: "Kira Garantili",
                            condition:
                              property.propertyDetails.isRentGuaranteed,
                          },
                          {
                            label: "Yeni Bina",
                            condition: property.propertyDetails.isNewBuilding,
                          },
                          {
                            label: "Ofis Kullanımına Uygun",
                            condition:
                              property.propertyDetails.isSuitableForOffice,
                          },
                          {
                            label: "İş Yeri Ruhsatlı",
                            condition:
                              property.propertyDetails.hasBusinessLicense,
                          },
                        ])}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-center mb-5">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    {property.agent.photo ? (
                      <img
                        src={property.agent.photo}
                        alt={property.agent.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          // Fallback to SVG if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const svgContainer = target.nextElementSibling as HTMLElement;
                          if (svgContainer) {
                            svgContainer.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <svg
                      className={`w-10 h-10 text-orange-500 ${property.agent.photo ? 'hidden' : 'block'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {property.agent.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {property.agent.company}
                  </p>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="block w-full py-3 px-6 bg-orange-500 text-white rounded-xl text-center font-medium hover:bg-orange-600 transition-colors"
                  >
                    Danışmanı Ara
                  </a>
                  <a
                    href={`https://wa.me/${property.agent.phone.replace(
                      /\D/g,
                      ""
                    )}?text=${encodeURIComponent(
                      `Merhaba ${property.agent.name},

🏠 İlan: ${property.title}
📍 Konum: ${formatLocation(property.location)}
💰 Fiyat: ${property.price.toLocaleString("tr-TR")} ₺${
                        type === "rent" ? "/ay" : ""
                      }
🆔 İlan No: ${property.id}

🔗 İlan Linki: ${currentUrl}

Bu ilan hakkında detaylı bilgi almak istiyorum. Müsait olduğunuzda görüşebilir miyiz?

Teşekkürler.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-3 px-6 bg-green-500 text-white rounded-xl text-center font-medium hover:bg-green-600 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="block w-full py-3 px-6 bg-gray-100 text-gray-900 rounded-xl text-center font-medium hover:bg-gray-200 transition-colors"
                  >
                    E-posta Gönder
                  </a>
                  <a
                    href={`/agent/${property.agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full py-3 px-6 bg-blue-500 text-white rounded-xl text-center font-medium hover:bg-blue-600 transition-colors"
                  >
                    Tüm İlanlarını Gör
                  </a>
                </div>
              </div>

                  {/* Sahibinden Link */}
{property.sahibindenLink && (
  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
    <a
      href={property.sahibindenLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full"
    >
      <div className="bg-[#fff200] text-black font-semibold text-base px-4 py-3 rounded-md text-center transition-all duration-300 ease-in-out group-hover:brightness-95 group-hover:shadow-md group-hover:scale-[1.02]">
        sahibinden.com'da görüntüle
      </div>
    </a>
  </div>
)}



              {/* Property ID */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center">
                <div className="text-gray-500 text-sm">İlan No</div>
                <div className="font-medium text-gray-900">{property.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
