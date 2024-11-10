import React, { useState, useEffect } from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';


  
  function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([])

  useEffect(() => {   
    fetch('http://localhost:6001/plants')
      .then((response) => response.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data);
      })
      .catch((error) => console.error('Error fetching plants:', error));
  }, []);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    if (!query) {
      setFilteredPlants(plants); //to Show all plants if query is empty
    } else {
      const filtered = plants.filter((plant) =>
        plant.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log('Filtered plants:', filtered);
      setFilteredPlants(filtered);
    }
  };
  
  return (
    <main>
      <NewPlantForm setPlants={setPlants} />
      <Search onSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}



export default PlantPage;