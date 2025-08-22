export const formatApiTextToHtml = (text: string): string => {
  if (!text) return "";

  return text
    .replace(/{bc}/g, ": ")
    .replace(/{it}/g, "<i><strong>")
    .replace(/{\/it}/g, "</strong></i>")
    .replace(/{phrase}/g, "<i><strong>")
    .replace(/{\/phrase}/g, "</strong></i>")
    .replace(/{sup}/g, "<sup>")
    .replace(/{\/sup}/g, "</sup>")
    .replace(/{sc}/g, '<span style="font-variant: small-caps">')
    .replace(/{\/sc}/g, "</span>")
    .replace(/{ldquo}/g, "&ldquo;")
    .replace(/{rdquo}/g, "&rdquo;")
    .replace(
      /{dx}see {dxt\|([^|}]+)\|[^|}]*\|[^|}]*}{\/dx}/g,
      (_match, p1) =>
        `<span>see </span><a href="/search-expression?query=${encodeURIComponent(
          p1.toLowerCase().trim()
        )}"><b>${p1}</b></a>`
    )
    .replace(
      /{sx\|([^|}]+)\|\|}/g,
      (_match, p1) =>
        `<a href="/search-expression?query=${encodeURIComponent(
          p1.toLowerCase().trim()
        )}"><b>${p1}</b></a>`
    );
};
