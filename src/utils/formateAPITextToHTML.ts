export const formatApiTextToHtml = (text: string): string => {
  return text
    .replace(/{bc}/g, ": ")
    .replace(/{it}/g, "<i>")
    .replace(/{\/it}/g, "</i>")
    .replace(/{sup}/g, "<sup>")
    .replace(/{\/sup}/g, "</sup>")
    .replace(/{sc}/g, '<span style="font-variant: small-caps">')
    .replace(/{ldquo}/g, "&ldquo;")
    .replace(/{rdquo}/g, "&rdquo;")
    .replace(/{\/sc}/g, "</span>")
       .replace(
      /{dx}see {dxt\|([^|}]+)\|[^|}]*\|[^|}]*}{\/dx}/g,
      (_match, p1) =>
        `<span>see</span>${" "}<a href="/search-expression?query=${encodeURIComponent(
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
}