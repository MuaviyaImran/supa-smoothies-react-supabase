import type { Smoothie } from '../types';

const SmoothieCard = ({ title, method, rating }: Smoothie) => {
  return (
    <div className='smoothie-cart'>
      <h3>{title}</h3>
      <p>{method}</p>
      <div className='rating'>{rating}</div>
    </div>
  );
};

export default SmoothieCard;
