"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  id: string;
  code: string;
  title: string;
  location: string;
  date: string;
  category: string;
  description: string;
  status: string;
  price?: string;
  images: string[];
  features: string[];
}

// Static projects data
const projects: Project[] = [
  {
    id: "229",
    code: "229",
    title: "Kartal Sahil Projesi",
    location: "Kartal, İstanbul",
    date: "16 Ekim 2024",
    category: "Konut",
    description: "Kartal Sahili'nde denize sıfır ilk parselde yükselen projemiz, kesintisiz ada manzarası ile büyülüyor. Tüm dairelerden görülebilen büyüleyici panoramik manzaralar, huzurlu bir ev yaşamının kapılarını açıyor.",
    status: "Satışta",
    price: "Fiyat için iletişime geçin",
    images: [
      "/uploads/projects/229/dky-sahil-galeri1.jpg",
      "/uploads/projects/229/dky-sahil-galeri2.jpg",
      "/uploads/projects/229/dky-sahil-galeri3.jpg",
      "/uploads/projects/229/dky-sahil-galeri5.jpg",
      "/uploads/projects/229/dky-sahil-galeri6.jpg",
      "/uploads/projects/229/dky-sahil-galeri8.jpg"
    ],
    features: [
      "Denize Sıfır Konum",
      "Ada Manzarası",
      "Yüzme Havuzu",
      "Fitness Merkezi",
      "Güvenlik",
      "Otopark"
    ]
  },
  {
    id: "228",
    code: "228",
    title: "Bağcılar Rezidans Projesi",
    location: "Bağcılar, İstanbul",
    date: "16 Ekim 2024",
    category: "Konut",
    description: "Basin Ekspres'e yakın Bağcılar bölgesinde yer alan 2 konut blokundan oluşan bu geliştirme projesi, alışveriş merkezleri, restoranlar, eğitim kurumları ve ulaşım seçenekleri dahil ihtiyacınız olan her şeye yakın birinci sınıf bir konuma sahiptir.",
    status: "Satışta",
    price: "Fiyat için iletişime geçin",
    images: [
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-7.jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-7 (1).jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-7 (2).jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-valory-gunesli-exterior2.jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-valory-gunesli-exterior2 (1).jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-valory-gunesli-exterior3.jpg",
      "/uploads/projects/228/project-media-14-gallery-cuverse-14-7-english-valory-gunesli-exterior3 (1).jpg"
    ],
    features: [
      "Merkezi Konum",
      "Modern Tasarım",
      "Yüksek Kalite Malzemeler",
      "Geniş Daire Seçenekleri",
      "24/7 Güvenlik",
      "Çocuk Oyun Alanı"
    ]
  },
  {
    id: "227",
    code: "227",
    title: "Kağıthane Yaşam Projesi",
    location: "Kağıthane, İstanbul",
    date: "16 Ekim 2024",
    category: "Konut",
    description: "Projemiz güneşin kalbi gibi eğlence, aşk, deniz, özgürlük, mutluluk, birçok lezzet, sohbet, dostluk ve kahkaha sunuyor. Su kenarında yeşil alanlar ve sosyal tesisler sunmaktadır. Müteahhidimiz tüm bu unsurları mükemmel ulaşım ve sosyal tesislerle birleştirmektedir.",
    status: "Satışta",
    price: "Fiyat için iletişime geçin",
    images: [
      "/uploads/projects/227/1-8.jpg",
      "/uploads/projects/227/3-1-4.jpg",
      "/uploads/projects/227/6-6.jpg",
      "/uploads/projects/227/7-8.jpg",
      "/uploads/projects/227/8-8.jpg",
      "/uploads/projects/227/9-5.jpg",
      "/uploads/projects/227/10-7.jpg",
      "/uploads/projects/227/11-4.jpg",
      "/uploads/projects/227/12-5.jpg",
      "/uploads/projects/227/14-5.jpg"
    ],
    features: [
      "Taşınmaya Hazır",
      "Tapu Hazır",
      "Merkezi Konum",
      "Vatandaşlığa Uygun",
      "Yatırım Fırsatı",
      "Yüksek Kira Getirisi"
    ]
  },
  {
    id: "226",
    code: "226",
    title: "Kağıthane Yatırım Projesi",
    location: "Kağıthane, İstanbul",
    date: "16 Ekim 2024",
    category: "Konut",
    description: "Projemiz İstanbul, Türkiye'nin en güvenilir ve sürdürülebilir başarılı gayrimenkul geliştirme ve yatırım şirketleri tarafından yeni nesil gayrimenkul yatırım modeli olarak hayata geçirilmiştir. Bölgede iki yıl üst üste 'En Yüksek Getiri Potansiyeli Olan Konut Projesi' seçilen projemiz, satın alınan özel dekore edilmiş üniteleri işleterek geleneksel gayrimenkul yatırımından çok daha fazla ve hızlı gelir sağlamaktadır.",
    status: "Satışta",
    price: "20 yıl gelir garantisi",
    images: [
      "/uploads/projects/226/project-media-28-gallery-cuverse-28-7-english-tsl2.jpg",
      "/uploads/projects/226/project-media-28-gallery-cuverse-28-7-english-tsl3.jpg",
      "/uploads/projects/226/superior-1.jpg",
      "/uploads/projects/226/superior-2.jpg",
      "/uploads/projects/226/superior-3.jpg",
      "/uploads/projects/226/superior-4.jpg",
      "/uploads/projects/226/superior-5.jpg",
      "/uploads/projects/226/superior-6.jpg",
      "/uploads/projects/226/superior-7.jpg",
      "/uploads/projects/226/superior-8.jpg"
    ],
    features: [
      "20 Yıl Gelir Garantisi",
      "Levent ve Maslak Yakını",
      "Profesyonel İşletme Modeli",
      "1+0, 1+1, 2+1 Seçenekleri",
      "Özel Dekorasyon",
      "Yüksek Getiri Potansiyeli"
    ]
  }
];

export default function ProjectsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: string]: number}>({});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/uploads/projects/229/dky-sahil-galeri1.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-semibold text-white mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f07f38]"
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
              Projelerimiz
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Gayrimenkul Projelerimiz
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              İstanbul'un en prestijli lokasyonlarında hayata geçirdiğimiz 
              projelerimizi keşfedin. Modern yaşamın tüm konforunu sunan 
              yatırım fırsatları.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group h-full"
              >
                <Link href={`/projects/${project.id}`}>
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                      {/* Image Section */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === "Satışta" 
                              ? "bg-green-500 text-white" 
                              : project.status === "Tamamlandı"
                              ? "bg-blue-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Code Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-[#f07f38] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            KOD: {project.code}
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* View Details Button */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2"
                          >
                            <span>Detayları Görüntüle</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[#f07f38] text-sm font-semibold">{project.category}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-gray-500 text-sm">{project.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f07f38] transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-4">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600 text-sm">{project.location}</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.features.slice(0, 3).map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="bg-[#f07f38]/10 text-[#f07f38] px-3 py-1 rounded-full text-xs font-medium">
                              +{project.features.length - 3} daha
                            </span>
                          )}
                        </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-[#f07f38] font-bold">
                          {project.price}
                        </div>
                        <motion.div
                          className="text-[#f07f38] font-semibold flex items-center gap-1"
                          whileHover={{ x: 3 }}
                        >
                          <span className="text-sm">İncele</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#f07f38] via-[#e06b2a] to-[#d85a1a]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hayalinizdeki Projeyi Bulamadınız mı?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Size özel proje önerilerimiz için uzman ekibimizle iletişime geçin. 
              İhtiyaçlarınıza en uygun yatırım fırsatlarını birlikte keşfedelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white text-[#f07f38] px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  İletişime Geç
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/investment-opportunities"
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Yatırım Fırsatları
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
