export function generateSlug(link: string | null, title: string | null, id: string): string {
  if (link) {
    const urlParts = link.split('/');
    return urlParts[urlParts.length - 1]; // Extract the last part of the URL as slug
  }
  return (title ?? id).replace(/\W+/g, "-").toLowerCase();
}