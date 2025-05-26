import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';
import type { Smoothie } from '../types';
import SmoothieCard from '../components/SmoothieCard';
import { SMOOTHIES } from '../config/tables.js';

const Home = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from(SMOOTHIES).select('*');

      if (error) {
        setFetchError('Could not fetch the smoothies');
        setSmoothies(null);
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);
  return (
    <div className='page home'>
      {fetchError && <p className='error'>{fetchError}</p>}
      {smoothies && (
        <div className='smoothie-grid'>
          {/* order by button */}
          <div className='smoothies'>
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                title={smoothie.title}
                method={smoothie.method}
                rating={smoothie.rating}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
