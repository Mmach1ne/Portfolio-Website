export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
}
