import React, { useState } from 'react';



const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    travelClass: 'BUSINESS',
    maxPrice: '',
    currency: 'USD'
  });
  
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const queryParams = new URLSearchParams({
        from: searchParams.from,
        to: searchParams.to,
        departureDate: searchParams.departureDate,
        returnDate: searchParams.returnDate,
        adults: searchParams.adults.toString(),
        travelClass: searchParams.travelClass,
        maxPrice: searchParams.maxPrice,
      });

      const response = await fetch(`/api/trips/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         
        }
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch flight results');
      }

      setSearchResults(data.data);
    } catch (err) {
      setError(err.message || 'An error occurred while searching for flights');
    } finally {
      setLoading(false);
    }
  };


  const renderSearchResults = () => {
    if (!searchResults) return null;

    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">Search Results</h3>
        {searchResults.prices.map((offer) => (
          <Card key={offer.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Flight {offer.id}</h4>
                {offer.itineraries.map((itinerary, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="text-sm text-gray-600">
                      Duration: {itinerary.duration}
                    </p>
                    {itinerary.segments.map((segment, segIdx) => (
                      <div key={segIdx} className="ml-4 mt-1 text-sm">
                        <p>
                          {segment.departure.iataCode} →{" "}
                          {segment.arrival.iataCode}
                        </p>
                        <p className="text-gray-500">
                          {segment.carrierCode} {segment.number}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {offer.price.total} {offer.price.currency}
                </p>
                <Button className="mt-2">
                  Select
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            Flight Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Input
                  name="from"
                  value={searchParams.from}
                  onChange={handleInputChange}
                  placeholder="Origin airport code"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input
                  name="to"
                  value={searchParams.to}
                  onChange={handleInputChange}
                  placeholder="Destination airport code"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    name="departureDate"
                    value={searchParams.departureDate}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="date"
                    name="returnDate"
                    value={searchParams.returnDate}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Adults</label>
                <Input
                  type="number"
                  name="adults"
                  value={searchParams.adults}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Children</label>
                <Input
                  type="number"
                  name="children"
                  value={searchParams.children}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Infants</label>
                <Input
                  type="number"
                  name="infants"
                  value={searchParams.infants}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Class</label>
                <select
                  name="travelClass"
                  value={searchParams.travelClass}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Price</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="number"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Maximum price"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Currency</label>
                <select
                  name="currency"
                  value={searchParams.currency}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Flights'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {renderSearchResults()}
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightSearch;