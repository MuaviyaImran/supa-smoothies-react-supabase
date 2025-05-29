import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';
import SmoothieCard from '../components/SmoothieCard';
import { SMOOTHIES } from '../config/tables.js';
import type { Smoothies } from '../types/supabase.js';

const Home = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [smoothies, setSmoothies] = useState<Smoothies[] | null>(null);
  const [orderBy, setOrderBy] = useState('created_at');
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from(SMOOTHIES)
        .select('*')
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError('Could not fetch the smoothies');
        setSmoothies(null);
        console.error(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) => {
      if (!prevSmoothies) return null;
      return prevSmoothies.filter((smoothie) => smoothie?.id !== id);
    });
  };
  return (
    <div className='page home'>
      {fetchError && <p className='error'>{fetchError}</p>}
      {smoothies && (
        <div className=' smoothies'>
          <div className='order-by'>
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>
              Time Created
            </button>
            <button onClick={() => setOrderBy('title')}>Title</button>
            <button onClick={() => setOrderBy('rating')}>Rating</button>
          </div>
          <div className='smoothie-grid'>
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
