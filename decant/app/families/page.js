'use client';
import SubPage from '../../components/SubPage';
import { QuizButton } from '../../components/Chrome';

export default function Families() {
  return (
    <SubPage
      label="For families"
      title="Helping a parent downsize?"
      lede="It is a big conversation to start. Decant gives your parent a clear, calm path, and gives you the comfort of knowing every step is looked after, with nothing decided without them."
      img="/img/kitchen.jpg"
      alt="A grandmother and her granddaughter laughing in the kitchen of a new single-level home"
      cta={<QuizButton className="btn btn-ink btn-lg" href="/quiz?for=parent">Start the quiz for a parent</QuizButton>}
      blocks={[
        ['Start with the quiz together', 'Sit down with your parent and answer the questions side by side. It takes a few minutes and gives everyone the same picture.'],
        ['Their next home secured first', 'Nothing is sold until the next home is lined up. That certainty is usually what turns “one day” into a plan.'],
        ['Close to family, by design', 'We search near the people and places that matter, so you are a pop-in away, not a weekend drive.'],
        ['A quiet sale', 'No signboard and no open homes. The family home is offered privately to qualified buyers.'],
        ['The move, handled', 'We coordinate a trusted local removal company and put $3,000 towards the move.'],
        ['You stay in the loop', 'With your parent’s permission, we keep you updated at every step and welcome you to viewings and meetings.'],
      ]}
    />
  );
}
