import { encrypt } from "./encrypt";

export function openSharePage() {
  //fetch thingy here, and then-
  alert('notImplemented');
  // window.open("https://www.google.com", "_blank");
}


export function submitHighscore(name: string, score: number): Promise<boolean> {
  const token = encrypt(JSON.stringify({ name, score }));
  return fetch(serverBaseUrl + 'h' + 's' + '/' + token, { method: 'POST' })
    .then(res => {
      return (res.status === 200);
    })
    .catch(e => {
      return false;
    });
}

export function getTopHighscores(): Promise<HighscoreEntry[] | null> {
  return fetch(serverBaseUrl + 'h' + 's' + '/', { method: 'GET' })
    .then(res => res.json())
    .catch(e => {
      return null;
    });
}

export type HighscoreEntry = { name: string, score: number };



const serverBaseUrl = 'http://localhost:3000/';