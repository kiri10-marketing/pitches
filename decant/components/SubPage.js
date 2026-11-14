'use client';
import { Nav, Footer, Sticky, QuizButton, useReveal } from './Chrome';

export default function SubPage({ label, title, lede, img, alt, cta, blocks, after }) {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <section className="page-hero">
          <div className="wrap">
            <span className="label">{label}</span>
            <h1>{title}</h1>
            <p>{lede}</p>
            {cta || <QuizButton className="btn btn-ink btn-lg" />}
          </div>
        </section>
        {img && (
          <div className="wrap"><img className="clip" src={img} alt={alt} style={{ width: '100%', aspectRatio: '21 / 9', objectFit: 'cover' }} /></div>
        )}
        <section className="sec">
          <div className="wrap">
            <div className="prose-grid">
              {blocks.map(([h, p], i) => (
                <div className={`c rv d${i % 3}`} key={h}>
                  <span className="label">0{i + 1}</span>
                  <h3 style={{ marginTop: 14 }}>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {after}
      </main>
      <Footer />
      <Sticky />
    </>
  );
}
