'use client';
import Link from 'next/link';
import SubPage from '../../components/SubPage';

export default function Developers() {
  return (
    <SubPage
      label="For developers"
      title="Downsizers are looking for your homes."
      lede="If you build single-level or downstairs-bedroom homes in Christchurch, Decant introduces you to buyers who have their brief, their budget and their timing sorted, and who are ready to buy off the plan."
      img="/img/offplan.jpg"
      alt="A single-level home in Cashmere with the Port Hills behind"
      cta={<a className="btn btn-ink btn-lg" href="mailto:hello@example.com?subject=Decant%20developer%20enquiry">Talk to us about your stock</a>}
      blocks={[
        ['Qualified, motivated buyers', 'Every downsizer has completed a detailed brief and spoken with a Decant concierge. You meet people who already want what you are building.'],
        ['Their sale is handled', 'We coordinate the quiet sale of their current home, timed to your settlement, so you are not left with an offer that depends on a sale nobody is managing.'],
        ['Demand you can see', 'Our downsizer demand map shows where buyers want to live, their budgets and what they need, so you can plan product to match.'],
        ['Sell off the plan', 'Downsizers value certainty. Securing a home early, before selling their own, is exactly what our process is built around.'],
        ['A general agency agreement', 'We list your stock under a general agency, alongside your own channels, and present it to matched buyers.'],
        ['Christchurch first', 'Launching in Christchurch, then growing across New Zealand with the developers we work with.'],
      ]}
      after={
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="cost-grid">
              <div className="hl" style={{ gridColumn: '1 / -1' }}>
                <h3 style={{ marginTop: 0, fontSize: 30 }}>See where downsizers want to live.</h3>
                <p>Ask us for a walk-through of the demand map for the suburb you are building in.</p>
                <div style={{ marginTop: 22 }}><Link className="btn btn-white" href="/demand">Preview the demand map</Link></div>
              </div>
            </div>
          </div>
        </section>
      }
    />
  );
}
