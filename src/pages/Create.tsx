import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { SMOOTHIES } from '../config/tables.js';

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly.');
      return;
    }

    const { data, error } = await supabase
      .from(SMOOTHIES)
      .insert([{ title, method, rating }])
      .select();

    if (error) {
      console.error(error);
      setFormError('Please fill in all the fields correctly.');
    }
    if (data) {
      setFormError(null);
      navigate('/');
    }
  };
  return (
    <div className='page create'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor='method'>Method:</label>
        <textarea
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
