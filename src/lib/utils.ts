export function formatMilliseconds(ms: number): string {
  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(ms / 1000);

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Return the formatted string
  return `${minutes} min ${seconds} s`;
}
