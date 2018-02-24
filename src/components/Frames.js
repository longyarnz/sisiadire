import React from 'react';

export default function Frame ({ x, attr }) {
  return (
    <main className={attr}>
      <h1>{x.title}</h1>
      {
        x.figures.map((a, e) => (
          <figure key={e}>
           {a.title ? <i className="material-icons">{a.title}</i> : <i className={a.icon} />}
            <figcaption>
              {a.phrase}
            </figcaption>
          </figure>
        ))
      }
    </main>
  )
}
