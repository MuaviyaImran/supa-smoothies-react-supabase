import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { SMOOTHIES } from '../config/tables.js';
import type { Smoothies } from '../types/supabase.js';

const Create = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  // @ts-expect-error: Initializing with empty fields for form, may not match Smoothies type
  const [formFields, setFormFields] = useState<Smoothies>({
    title: '',
    method: '',
    rating: Number(''),
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formFields) return;
    if (!formFields.title || !formFields.method || !formFields.rating) {
      setFormError('Please fill in all the fields correctly.');
      return;
    }

    const { data, error } = await supabase
      .from(SMOOTHIES)
      .insert([formFields])
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields!,
      [id]: value,
    }));
  };
  return (
    <div className='page create'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formFields!.title!}
          onChange={handleChange}
        />

        <label htmlFor='method'>Method:</label>
        <textarea
          name='method'
          id='method'
          value={formFields!.method!}
          onChange={handleChange}
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={formFields!.rating!}
          name='rating'
          onChange={handleChange}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
