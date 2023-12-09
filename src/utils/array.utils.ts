// Return a shuffled version of the array. Adapted from https://stackoverflow.com/a/12646864 to
// avoid shuffling in place.
export function shuffleArray<T>(array_: T[]): T[] {
  const array = [...array_];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
