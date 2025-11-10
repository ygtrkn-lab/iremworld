import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysql';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log('Fetching property with slug:', slug);

    // Sadece property verilerini çek
    const [rows] = await pool.execute(`
      SELECT * FROM properties WHERE slug = ?
    `, [slug]);

    const properties = rows as any[];

    if (properties.length === 0) {
      return NextResponse.json(
        { error: 'Emlak bulunamadı' },
        { status: 404 }
      );
    }

    const property = properties[0];

    // API response formatını frontend'in beklediği formata dönüştür
    const formattedProperty = {
      id: property.id,
      title: property.title,
      slug: property.slug,
      description: property.description,
      price: property.price,
      type: property.type,
      location: {
        city: property.city,
        district: property.district,
        neighborhood: property.neighborhood,
        address: property.address,
        coordinates: {
          lat: property.coordinates_lat,
          lng: property.coordinates_lng
        }
      },
      specs: {
        netSize: property.net_size,
        grossSize: property.gross_size,
        rooms: property.rooms,
        bathrooms: property.bathrooms,
        age: property.age,
        floor: property.floor,
        totalFloors: property.total_floors,
        heating: property.heating,
        furnishing: property.furnishing,
        balconyCount: property.balcony_count
      },
      category: {
        main: property.category_main,
        sub: property.category_sub
      },
      images: property.images ? JSON.parse(property.images) : [],
      agent: {
        id: property.agent_id,
        name: property.agent_name,
        phone: property.agent_phone,
        email: property.agent_email,
        photo: property.agent_photo,
        company: property.agent_company
      },
      createdAt: property.created_at,
      updatedAt: property.updated_at,
      viewCount: property.view_count,
      status: property.status,
      propertyDetails: {
        usageStatus: property.usage_status,
        deedStatus: property.deed_status,
        fromWho: property.from_who,
        isSettlement: property.is_settlement,
        creditEligible: property.credit_eligible,
        exchangeAvailable: property.exchange_available,
        inSite: property.in_site,
        monthlyFee: property.monthly_fee,
        hasDebt: property.has_debt,
        debtAmount: property.debt_amount,
        isRentGuaranteed: property.is_rent_guaranteed,
        rentGuaranteeAmount: property.rent_guarantee_amount,
        isNewBuilding: property.is_new_building,
        isSuitableForOffice: property.is_suitable_for_office,
        hasBusinessLicense: property.has_business_license
      },
      interiorFeatures: {
        kitchenType: property.kitchen_type,
        hasBuiltInKitchen: property.has_built_in_kitchen,
        hasBuiltInWardrobe: property.has_built_in_wardrobe,
        hasLaminate: property.has_laminate,
        hasParquet: property.has_parquet,
        hasCeramic: property.has_ceramic,
        hasMarble: property.has_marble,
        hasWallpaper: property.has_wallpaper,
        hasPaintedWalls: property.has_painted_walls,
        hasSpotLighting: property.has_spot_lighting,
        hasHiltonBathroom: property.has_hilton_bathroom,
        hasJacuzzi: property.has_jacuzzi,
        hasShowerCabin: property.has_shower_cabin,
        hasAmericanDoor: property.has_american_door,
        hasSteelDoor: property.has_steel_door,
        hasIntercom: property.has_intercom
      },
      exteriorFeatures: {
        hasBalcony: property.has_balcony,
        hasTerrace: property.has_terrace,
        hasGarden: property.has_garden,
        hasGardenUse: property.has_garden_use,
        hasSeaView: property.has_sea_view,
        hasCityView: property.has_city_view,
        hasNatureView: property.has_nature_view,
        hasPoolView: property.has_pool_view,
        facade: property.facade
      },
      buildingFeatures: {
        hasElevator: property.has_elevator,
        hasCarPark: property.has_car_park,
        hasClosedCarPark: property.has_closed_car_park,
        hasOpenCarPark: property.has_open_car_park,
        hasSecurity: property.has_security,
        has24HourSecurity: property.has_24_hour_security,
        hasCameraSystem: property.has_camera_system,
        hasConcierge: property.has_concierge,
        hasPool: property.has_pool,
        hasGym: property.has_gym,
        hasSauna: property.has_sauna,
        hasTurkishBath: property.has_turkish_bath,
        hasPlayground: property.has_playground,
        hasBasketballCourt: property.has_basketball_court,
        hasTennisCourt: property.has_tennis_court,
        hasGenerator: property.has_generator,
        hasFireEscape: property.has_fire_escape,
        hasFireDetector: property.has_fire_detector,
        hasWaterBooster: property.has_water_booster,
        hasSatelliteSystem: property.has_satellite_system,
        hasWifi: property.has_wifi
      },
      landDetails: property.category_main === 'Arsa' ? {
        zoningStatus: property.zoning_status,
        pricePerSquareMeter: property.price_per_square_meter,
        blockNumber: property.block_number,
        parcelNumber: property.parcel_number,
        sheetNumber: property.sheet_number,
        floorAreaRatio: property.floor_area_ratio,
        buildingHeight: property.building_height,
        creditEligibility: property.credit_eligibility
      } : undefined
    };

    // İlan görüntülenme sayısını artır
    await pool.execute(
      'UPDATE properties SET view_count = view_count + 1 WHERE id = ?',
      [property.id]
    );

    return NextResponse.json(formattedProperty);

  } catch (error) {
    console.error('Property slug API Error:', error);
    return NextResponse.json(
      { error: 'Emlak detayları yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
