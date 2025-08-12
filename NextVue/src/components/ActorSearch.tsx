import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActor, removeActor } from "../app/features/filterSlice";
import { searchActorsByName } from '../app/features/actorSlice'; // Import the new thunk
import type { RootState } from '../app/store';
import type { AppDispatch } from '../app/store';
import type { Actor } from '../types';

const ActorSearch: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.actor.searchResults); // Get search results
  const selectedActors = useSelector((state: RootState) => state.filter.actors);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]); // Will be updated by Redux state
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(searchActorsByName(searchTerm)); // Dispatch the search thunk
      setShowDropdown(true);
    }
  }, [searchTerm, dispatch]); // Add dispatch to dependency array

  // Update filteredActors when searchResults change
  useEffect(() => {
    if (searchTerm.length > 0) {
      // Filter out actors already selected
      const newFilteredActors = searchResults.filter(
        (actor: Actor) => !selectedActors.some((selected: Actor) => selected.id === actor.id)
      );
      // Only show actors with a profile path
      const actorsWithProfile = newFilteredActors.filter((actor: Actor) => actor.profile_path);
      setFilteredActors(actorsWithProfile);
    } else {
      setFilteredActors([]);
    }
  }, [searchResults, selectedActors, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleActorSelect = (actor: Actor) => {
    dispatch(addActor(actor));
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleRemoveActor = (actorId: number) => {
    dispatch(removeActor(actorId));
  };

  return (
    <div className="w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search actors..."
          className="w-60 sm:w-70 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green bg-primary-light-gray text-primary-white border-b-2 border-primary-green"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay to allow click on dropdown item
        />
        {showDropdown && filteredActors.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-primary-light-gray rounded-lg shadow-lg max-h-56 overflow-y-auto text-primary-white">
            {filteredActors.map((actor: Actor) => (
              <div
                key={actor.id}
                className="flex items-center p-2 cursor-pointer hover:bg-primary-black"
                onClick={() => handleActorSelect(actor)}
              >
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                    alt={actor.name}
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full mr-2 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    No Img
                  </div>
                )}
                <span className="text-primary-white">{actor.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-start gap-4 mt-4">
        {selectedActors.map((actor: Actor) => (
          <div
            key={actor.id}
            className="flex items-center bg-primary-light-gray text-primary-white rounded-lg p-2 pr-1 text-sm"
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                alt={actor.name}
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full mr-2 bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                    No Img
                  </div>
                )}
            <span>{actor.name}</span>
            <button
              onClick={() => handleRemoveActor(actor.id)}
              className="ml-2 p-1 rounded-full hover:bg-lime-400 transition-colors duration-200"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorSearch;
