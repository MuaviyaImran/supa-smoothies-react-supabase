import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import { SMOOTHIES } from '../config/tables.js';

import type { Smoothies } from '../types/supabase.js';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<Smoothies>();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formFields) return;
    if (!formFields.title || !formFields.method || !formFields.rating) {
      setFormError('Please fill in all the fields correctly.');
      return;
    }

    const { data, error } = await supabase
      .from(SMOOTHIES)
      .update({
        ...formFields,
        title: formFields.title,
        method: formFields.method,
        rating: Number(formFields.method),
      })
      .eq('id', Number(id))
      .select();

    if (error) {
      setFormError('Please fill in all the fields correctly.');
    }
    console.log(data);
    if (data) {
      setFormError(null);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from(SMOOTHIES)
        .select()
        .eq('id', Number(id))
        .single();

      if (error) {
        navigate('/', { replace: true });
      }
      if (data) {
        setFormFields({
          title: data.title!,
          method: data.method!,
          rating: data.rating!,
          created_at: data.created_at!,
          id: data.id!,
        });
      }
    };

    fetchSmoothie();
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields!,
      [id]: value,
    }));
  };
  if (!formFields) return null;
  return (
    <div className='page create'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          value={formFields!.title!}
          onChange={handleChange}
          name='title'
        />

        <label htmlFor='method'>Method:</label>
        <textarea
          id='method'
          value={formFields!.method!}
          onChange={handleChange}
          name='method'
        />

        <label htmlFor='rating'>Rating:</label>
        <input
          type='number'
          id='rating'
          value={formFields!.rating!}
          onChange={handleChange}
          name='rating'
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
