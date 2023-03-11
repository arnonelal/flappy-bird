import { Component, useEffect, useState } from 'react';
import { getTopHighscores, HighscoreEntry } from 'utils/fetch';
import './HighscoreLoader.scss';



export default function HighscoreLoader() {

  const [status, entries] = useFetchHighscore();

  return (
    <div id='HighscoreLoader'>
      {(status === 'loading') && <div className='_placeholder'>Loading...</div>}
      {(status === 'error') && <div className='_placeholder' style={{ color: 'red' }}>error</div>}
      {(status === 'success') &&
        <div className='_entriesTable'>
          {entries.map((entry, index) =>
            <div key={index} className='_entry'>
              <div className='_entryContent'>
                <div className='_name'>{entry.name}</div>
                <div className='_score'>{entry.score}</div>
              </div>
              {index < entries.length - 1 && <div className='_seperator' />}
            </div>
          )}
        </div>
      }
    </div>
  )
}


type FetchStatus = 'loading' | 'success' | 'error';


function useFetchHighscore(): [
  fetchStatus: FetchStatus,
  highscoreEntries: HighscoreEntry[],
] {
  const [entries, setEntries] = useState<HighscoreEntry[]>([]);

  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    getTopHighscores()
      .then((result) => {
        if (result === null) {
          setStatus('error');
          setEntries([]);
        } else {
          setStatus('success');
          setEntries(result);
        }
      })
  }, []);

  return [status, entries];
}