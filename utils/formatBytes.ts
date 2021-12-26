/** From https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c */
export function formatBytes(bytes: number, decimals?: number): string {
  if (bytes == 0) return '0 Bytes';
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const comparePercentageSizeChange = (before: number, after: number): string => {
  if (before > after) return `now ${(100 - (after / before) * 100).toFixed(2)}% smaller`;
  else if (before < after) return `now ${((after / before) * 100 - 100).toFixed(2)}% larger`;
  else return 'the same size';
};
