'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, X } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  price: number;
  change: number;
  genre: string;
  releaseDate: string;
}

// Mock database of movies
const movieDatabase: { [key: string]: number } = {
  "The Avengers": 15.99,
  "Inception": 12.99,
  "The Shawshank Redemption": 9.99,
  "Pulp Fiction": 11.99,
  "The Dark Knight": 14.99,
  "Forrest Gump": 10.99,
  "The Matrix": 13.99,
  "Goodfellas": 11.99,
  "The Silence of the Lambs": 10.99,
  "Schindler's List": 12.99,
  "Lagaan": 10.99,
  "3 Idiots": 12.99,
  "Dangal": 13.99,
  "Baahubali: The Beginning": 14.99,
  "PK": 11.99,
  "Sholay": 9.99,
  "Dilwale Dulhania Le Jayenge": 10.99,
  "Andhadhun": 12.99,
  "Gangs of Wasseypur": 13.99,
  "Mughal-e-Azam": 11.99,
  "Kabhi Khushi Kabhie Gham": 12.99,
  "Drishyam": 11.99,
  "Bajrangi Bhaijaan": 13.99,
  "Gully Boy": 12.99,
  "Padmaavat": 14.99,
};

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState({ title: '', price: 0 });

  useEffect(() => {
    // Fetch watchlist from localStorage or API
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, []);

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = () => {
    if (newMovie.title && newMovie.price > 0) {
      const movie: Movie = {
        id: Date.now(),
        title: newMovie.title,
        price: newMovie.price,
        change: 0,
        genre: 'Unknown',
        releaseDate: new Date().toISOString().split('T')[0],
      };
      setWatchlist([...watchlist, movie]);
      setNewMovie({ title: '', price: 0 });
    }
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter(movie => movie.id !== id));
  };

  const handleMovieSelect = (title: string) => {
    const price = movieDatabase[title] || 0;
    setNewMovie({ title, price });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Movie</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Select onValueChange={handleMovieSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a movie" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(movieDatabase).map((title) => (
                <SelectItem key={title} value={title}>{title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Price"
            value={newMovie.price || ''}
            onChange={(e) => setNewMovie({ ...newMovie, price: parseFloat(e.target.value) })}
            disabled
          />
          <Button onClick={addToWatchlist}>Add to Watchlist</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {watchlist.map((movie) => (
          <Card key={movie.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeFromWatchlist(movie.id)}
            >
              <X size={16} />
            </Button>
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">₹{movie.price.toFixed(2)}</p>
              <div className="flex items-center">
                {movie.change >= 0 ? (
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                ) : (
                  <TrendingDown className="text-red-500 mr-1" size={16} />
                )}
                <span className={movie.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {movie.change.toFixed(2)}%
                </span>
              </div>
              <p className="text-sm text-gray-500">Genre: {movie.genre}</p>
              <p className="text-sm text-gray-500">Release Date: {movie.releaseDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;