'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DollarSign, Film, TrendingUp, Settings, Star, Award, Users, Calendar, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx'; // Ensure clsx is installed: npm install clsx
import Watchlist from './watchlist';

const generateMovieData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: Math.random() * 10 + 10,
    volume: Math.random() * 1000000,
  }));
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const MovieInvestmentDashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [portfolio, setPortfolio] = useState({
    totalValue: 250000,
    change: 7500,
    distribution: [
      { name: 'Bollywood Action', value: 5000 },
      { name: 'Romance', value: 3500 },
      { name: 'Drama', value: 2500 },
      { name: 'Thriller', value: 1800 },
      { name: 'Comedy', value: 1500 }
    ]
  });

  const [watchlist] = useState([
    { id: 1, title: "Pathaan", price: 25.50, change: 3.2, genre: "Action", releaseDate: "2024-01-25" },
    { id: 2, title: "KGF Chapter 3", price: 30.75, change: -0.8, genre: "Action", releaseDate: "2024-05-10" },
    { id: 3, title: "Liger", price: 18.40, change: 1.5, genre: "Sports Drama", releaseDate: "2023-12-15" },
    { id: 4, title: "Gangubai Kathiawadi", price: 22.10, change: 2.0, genre: "Biographical", releaseDate: "2023-11-05" },
  ]);

  const [selectedMovie, setSelectedMovie] = useState<{
    title: string;
    price: number;
    change: number;
    data: { day: number; price: number; volume: number; }[];
    cast: string[];
    director: string;
    budget: number;
  }>({
    title: "Pathaan",
    price: 25.50,
    change: 3.2,
    data: generateMovieData(),
    cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
    director: "Siddharth Anand",
    budget: 200000000
  });

  const [newsAlert, setNewsAlert] = useState<{ title: string; description: string } | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState(50);
  const [investmentSector, setInvestmentSector] = useState('Bollywood');
  const [activeView, setActiveView] = useState('dashboard');

  // Define new data for additional investments
  const insuranceDistribution = useMemo(() => [
    { name: 'Health Insurance', value: 3000 },
    { name: 'Life Insurance', value: 2000 },
    { name: 'Vehicle Insurance', value: 1500 },
    { name: 'Property Insurance', value: 2500 },
  ], []);

  const musicIndustryDistribution = useMemo(() => [
    { name: 'Pop', value: 4000 },
    { name: 'Classical', value: 2000 },
    { name: 'Rock', value: 2500 },
    { name: 'Jazz', value: 1500 },
  ], []);

  const INSURANCE_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
  const MUSIC_COLORS = ['#FF9F40', '#4BC0C0', '#9966FF', '#FF6384'];

  const calculateTax = (profit: number) => {
    const taxRate = 0.15; // 15% long-term capital gains tax
    return profit * taxRate;
  };

  // Handle Buy Shares
  const handleBuyShares = () => {
    const investmentValue = (investmentAmount / 100) * selectedMovie.price;
    const profit = investmentValue * 0.05; // Example profit calculation
    const tax = calculateTax(profit);
    setPortfolio((prev) => ({
      ...prev,
      totalValue: prev.totalValue + investmentValue,
      change: prev.change + profit - tax,
    }));
    setNewsAlert({
      title: "Investment Successful",
      description: `You have invested ₹${investmentValue.toFixed(2)} in ${selectedMovie.title}. Profit after tax: ₹${(profit - tax).toFixed(2)}.`,
    });
  };

  // Handle Sell Shares
  const handleSellShares = () => {
    const investmentValue = (investmentAmount / 100) * selectedMovie.price;
    setPortfolio((prev) => ({
      ...prev,
      totalValue: prev.totalValue - investmentValue,
      change: prev.change - investmentValue * 0.02, // Example change calculation
    }));
    setNewsAlert({
      title: "Sale Successful",
      description: `You have sold ₹${investmentValue.toFixed(2)} worth of shares in ${selectedMovie.title}.`,
    });
  };

  // Enhanced Portfolio Distribution with Donut Chart
  const enhancedDistribution = useMemo(() => portfolio.distribution, [portfolio.distribution]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewsAlert({
        title: "Breaking News",
        description: `${selectedMovie.title} director announces surprise cameo!`
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedMovie]);

  // Define Production Houses Data outside JSX
  const productionHousesDistribution = useMemo(() => [
    { name: 'Yash Raj Films', value: 5000 },
    { name: 'Dharma Productions', value: 3000 },
    { name: 'Red Chillies Entertainment', value: 2000 },
    { name: 'Eros International', value: 1500 },
  ], []);

  const PRODUCTION_COLORS = ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div
        className={clsx(
          "bg-white shadow-lg p-4 flex flex-col items-start justify-between transition-all duration-300",
          isSidebarExpanded ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col w-full">
          {/* Sidebar Items */}
          <div className="flex flex-col items-start space-y-6">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setActiveView('dashboard')}
            >
              <DollarSign
                size={24}
                className="text-green-500 hover:text-green-400 transition-colors hover:scale-105 transition-transform duration-200"
              />
              {isSidebarExpanded && <span className="text-gray-700 font-medium">Dashboard</span>}
            </div>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setActiveView('watchlist')}
            >
              <BarChart2
                size={24}
                className="text-indigo-500 hover:text-indigo-400 transition-colors hover:scale-105 transition-transform duration-200"
              />
              {isSidebarExpanded && <span className="text-gray-700 font-medium">Watchlist</span>}
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp
                size={24}
                className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors hover:scale-105 transition-transform duration-200"
              />
              {isSidebarExpanded && <span className="text-gray-700 font-medium">Trends</span>}
            </div>
            <div className="flex items-center space-x-4">
              <Star
                size={24}
                className="text-yellow-500 hover:text-yellow-400 cursor-pointer transition-colors hover:scale-105 transition-transform duration-200"
              />
              {isSidebarExpanded && <span className="text-gray-700 font-medium">Favorites</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center w-full">
          <Settings className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors" />
          {isSidebarExpanded && <span className="text-gray-700 font-medium ml-2">Settings</span>}
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="ml-auto text-gray-500 hover:text-gray-400 focus:outline-none"
          >
            {isSidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-white">
        {newsAlert && (
          <Alert className="bg-yellow-100 border-yellow-300">
            <AlertTitle>{newsAlert.title}</AlertTitle>
            <AlertDescription>{newsAlert.description}</AlertDescription>
          </Alert>
        )}

        {activeView === 'dashboard' ? (
          <>
            {/* Portfolio Summary */}
            <Card className="bg-white shadow-sm border border-gray-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-green-500">₹{portfolio.totalValue.toLocaleString()}</h2>
                    <p className="text-sm text-gray-500">Portfolio Value</p>
                  </div>
                  <div className={`flex items-center ${portfolio.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {portfolio.change >= 0 ? <TrendingUp size={20} /> : <TrendingUp size={20} className="transform rotate-180" />}
                    <span className="ml-1 text-xl">₹{Math.abs(portfolio.change).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scrollable Container for Charts and Investment Components */}
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Movie Watchlist */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center"><BarChart2 className="mr-2" /> Watchlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {watchlist.map((movie) => (
                        <li
                          key={movie.id}
                          className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-colors rounded p-2 cursor-pointer"
                          onClick={() => setSelectedMovie({
                            title: movie.title,
                            price: movie.price,
                            change: movie.change,
                            data: generateMovieData(),
                            cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
                            director: "Siddharth Anand",
                            budget: 200000000
                          })}
                        >
                          <div>
                            <span className="font-medium">{movie.title}</span>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar size={12} className="mr-1" /> {new Date(movie.releaseDate).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{movie.price.toFixed(2)}</div>
                            <div className={movie.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                              {movie.change >= 0 ? '+' : '-'}{Math.abs(movie.change)}%
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Enhanced Portfolio Distribution */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2" /> Portfolio Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={enhancedDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {enhancedDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Price History Graph */}
                <Card className="bg-white shadow-sm border border-gray-200 col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Film className="mr-2" /> {selectedMovie.title}
                    </CardTitle>
                    <div className="text-sm text-gray-500">
                      <Users className="inline mr-1" /> {selectedMovie.cast.join(', ')}
                      <Award className="inline ml-2 mr-1" /> {selectedMovie.director}
                      <DollarSign className="inline ml-2 mr-1" /> Budget: ${(selectedMovie.budget / 10000000).toFixed(2)}Cr
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="price">
                      <TabsList>
                        <TabsTrigger value="price">Price</TabsTrigger>
                        <TabsTrigger value="volume">Volume</TabsTrigger>
                      </TabsList>
                      <TabsContent value="price">
                        <ResponsiveContainer width="100%" height={250}>
                          <LineChart data={selectedMovie.data}>
                            <XAxis dataKey="day" />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip 
                              formatter={(value, ) => [typeof value === 'number' ? value.toFixed(2) : value, 'Price']}
                              labelFormatter={(label) => `Day ${label}`}
                            />
                            <Line type="monotone" dataKey="price" stroke="#3B82F6" dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </TabsContent>
                      <TabsContent value="volume">
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={selectedMovie.data}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip 
                              formatter={(value, ) => [typeof value === 'number' ? value.toLocaleString() : value, 'Volume']}
                              labelFormatter={(label) => `Day ${label}`}
                            />
                            <Bar dataKey="volume" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Investment Sector and Other Components */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Investment Sector Selector */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center"><Star size={18} className="mr-2 text-yellow-500" /> Investment Sector</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <select
                      value={investmentSector}
                      onChange={(e) => setInvestmentSector(e.target.value)}
                      className="mt-2 p-2 border rounded w-full"
                    >
                      <option value="Bollywood">Bollywood</option>
                      <option value="Tollywood">Tollywood</option>
                      <option value="Kollywood">Kollywood</option>
                      <option value="Regional">Regional</option>
                      <option value="Production Houses">Production Houses</option>
                      <option value="Music Industry">Music Industry</option>
                      <option value="Insurances">Insurances</option>
                    </select>
                  </CardContent>
                </Card>

                {/* Add Investment into Production Houses */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2" /> Production Houses Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productionHousesDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {productionHousesDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PRODUCTION_COLORS[index % PRODUCTION_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Add Investment into Music Industry */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star size={18} className="mr-2 text-yellow-500" /> Music Industry Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={musicIndustryDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {musicIndustryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={MUSIC_COLORS[index % MUSIC_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Add Investment Insurances Graph */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="mr-2" /> Insurance Investments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={insuranceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {insuranceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={INSURANCE_COLORS[index % INSURANCE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <Watchlist />
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white shadow-lg p-6 space-y-6">
        <Card className="bg-gradient-to-br from-green-400 to-green-600">
          <CardContent className="p-4">
            <h3 className="font-bold mb-2 text-lg text-white">Invest in {selectedMovie.title}</h3>
            <Input
              type="range"
              min={0}
              max={100}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-200">
              <span>0%</span>
              <span>{investmentAmount}%</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between mt-4">
              <Button className="flex-1 mr-2 bg-green-500 hover:bg-green-600 text-white" onClick={handleBuyShares}>
                Buy Shares
              </Button>
              <Button className="flex-1 ml-2 bg-red-500 hover:bg-red-600 text-white" onClick={handleSellShares}>
                Sell Shares
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUp size={18} className="mr-2 text-indigo-500" /> Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm flex justify-between"><span>Bought 10 shares of &quot;Pathaan&quot;</span> <span className="text-green-500">+₹152.30</span></li>
              <li className="text-sm flex justify-between"><span>Sold 5 shares of &quot;KGF Chapter 3&quot;</span> <span className="text-red-500">-₹112.25</span></li>
              <li className="text-sm flex justify-between"><span>Bought 3 shares of &quot;Liger&quot;</span> <span className="text-green-500">+₹60.36</span></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center"><Star size={18} className="mr-2 text-yellow-500" /> Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {watchlist.sort((a, b) => b.change - a.change).slice(0, 3).map((movie, index) => (
                <li key={movie.id} className="text-sm flex justify-between items-center">
                  <span>{index + 1}. {movie.title}</span>
                  <span className="text-green-500">+{movie.change}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovieInvestmentDashboard;

