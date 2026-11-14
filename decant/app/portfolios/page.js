'use client';
import SubPage from '../../components/SubPage';

export default function Portfolios() {
  return (
    <SubPage
      label="Rental portfolios and businesses"
      title="Downsizing more than a home?"
      lede="Some of the people we help are also stepping back from a rental portfolio or a business. The same principle applies: secure what comes next first, then sell calmly and in the right order."
      img="/img/living.jpg"
      alt="A calm, light-filled living room in a new single-level home"
      blocks={[
        ['One plan, in the right order', 'We map out which properties to sell, when, and how each sale lines up with the purchase of your next home.'],
        ['Quiet sales across the portfolio', 'Each property can be offered privately to qualified buyers, with tenants and timing handled with care.'],
        ['Alongside your advisers', 'We work with your accountant and lawyer so the sequence suits your tax and legal position. We do not give that advice ourselves.'],
        ['Selling a business with property', 'If your business and its premises are part of the move, we coordinate the property side and keep everyone on the same timeline.'],
        ['Your next home, secured first', 'As with every Decant move, you know where you are going before anything is sold.'],
        ['$3,000 towards your move', 'When you move with Decant, we put $3,000 towards the move itself.'],
      ]}
    />
  );
}
