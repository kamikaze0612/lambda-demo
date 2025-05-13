"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronRight,
  Briefcase,
  Building,
  Users,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Company data
const companies = [
  {
    id: 1,
    name: "Очир Ундраа Холдинг",
    logo: "/logos/company1.png",
    openPositions: 3,
    tags: ["Сервис менежмент", "Үйл ухраа"],
    featured: true,
    category: "technology",
  },
  {
    id: 2,
    name: "Соёлон Интернэшнл ХХК",
    logo: "/logos/company2.png",
    openPositions: 5,
    tags: ["Үйл ухраа"],
    featured: false,
    category: "business",
  },
  {
    id: 3,
    name: "Bayan Bridge LLC",
    logo: "/logos/company3.png",
    openPositions: 3,
    tags: ["Барилга угсралт", "засвар", "засал"],
    featured: true,
    category: "construction",
  },
  {
    id: 4,
    name: "Арш Технологи ХХК",
    logo: "/logos/company4.png",
    openPositions: 3,
    tags: ["Технологи", "Аюулгүй байдал", "хөн"],
    featured: false,
    category: "technology",
  },
  {
    id: 5,
    name: "Шүнхлэй ХХК",
    logo: "/logos/company5.png",
    openPositions: 3,
    tags: ["Гадаад хэлээр сайбар"],
    featured: false,
    category: "business",
  },
  {
    id: 6,
    name: "Ger content group",
    logo: "/logos/company6.png",
    openPositions: 4,
    tags: ["Медиа", "интертаймент", "телевиз"],
    featured: true,
    category: "media",
  },
  {
    id: 7,
    name: "Ekklesia",
    logo: "/logos/company7.png",
    openPositions: 1,
    tags: ["Хүний нөөц"],
    featured: false,
    category: "business",
  },
  {
    id: 8,
    name: "erxes Mongolia LLC",
    logo: "/logos/company8.png",
    openPositions: 2,
    tags: ["Information Technology (IT)"],
    featured: true,
    category: "technology",
  },
  {
    id: 9,
    name: "Эрдэнэ Монгол ХХК",
    logo: "/logos/company9.png",
    openPositions: 1,
    tags: ["үйл ухраа"],
    featured: false,
    category: "business",
  },
  {
    id: 10,
    name: "Юбикаб Холдинг ХХК",
    logo: "/logos/company10.png",
    openPositions: 7,
    tags: ["Мэдээлэл технологи"],
    featured: true,
    category: "technology",
  },
];

// Stats data
const stats = [
  { label: "Active Companies", value: "500+", icon: Building },
  { label: "Open Positions", value: "1,200+", icon: Briefcase },
  { label: "Talents Hired", value: "10,000+", icon: Users },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [activeCategory, setActiveCategory] = useState("all");
  const [onlineUsers, setOnlineUsers] = useState(504);

  // Filter companies based on search term and category
  useEffect(() => {
    let filtered = companies;

    if (searchTerm) {
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (company) => company.category === activeCategory
      );
    }

    setFilteredCompanies(filtered);
  }, [searchTerm, activeCategory]);

  // Simulate online users changing
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find Your Perfect <span className="text-gray-400">Match</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-200">
            Connect with top companies and talents. Whether you&apos;re hiring
            or looking for your next opportunity, Lambda makes it simple.
          </p>

          <div className="relative mx-auto max-w-2xl">
            <div className="flex overflow-hidden rounded-lg shadow-lg">
              <Input
                type="text"
                placeholder="Search for companies, positions, or skills..."
                className="h-14 flex-1 border-0 bg-white/95 px-6 text-base shadow-none focus-visible:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="h-14 rounded-l-none bg-gray-800 px-6 hover:bg-gray-900">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            <motion.div
              className="absolute -bottom-4 left-0 right-0 mx-auto h-8 w-3/4 rounded-full bg-purple-500/20 blur-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                width: ["70%", "75%", "70%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto -mt-10 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="border-none bg-white/80 shadow-md backdrop-blur">
                <CardContent className="flex items-center p-6">
                  <div className="mr-4 rounded-full bg-purple-100 p-3 text-purple-600">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-bold tracking-tight">
            Discover <span className="text-purple-600">Top Companies</span>
          </h2>

          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="construction">Construction</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden border-none bg-white shadow-md transition-all duration-300 hover:shadow-lg">
                {company.featured && (
                  <div className="absolute -right-12 top-4 z-10 rotate-45 bg-gradient-to-r from-amber-500 to-orange-500 px-12 py-1 text-xs font-medium text-white">
                    Featured
                  </div>
                )}
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-100 p-1">
                    <div className="flex h-full w-full items-center justify-center">
                      {/* Placeholder for company logo */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-600">
                        {company.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <Briefcase className="mr-1 h-3 w-3" />
                      <span className="font-medium text-purple-600">
                        {company.openPositions} open positions
                      </span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    {company.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-gray-50 group-hover:text-gray-600"
                  >
                    View Positions
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gray-500 to-gray-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium">No companies found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="mb-8 text-slate-300">
                Join over 10,000 professionals who found their dream job through
                Lambda
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="bg-gray-600 hover:bg-gray-700">
                  For Job Seekers
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-500 text-gray-300 hover:bg-gray-950 hover:text-gray-200"
                >
                  For Employers
                </Button>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                <span className="inline-flex items-center">
                  <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                  {onlineUsers} users online now
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
