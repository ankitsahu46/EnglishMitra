// Capitalize the first letter outside of HTML tags and after any leading punctuation/whitespace

export const capitalizeFirstLetter = (text: string | null | undefined): string => {
  if (!text) return "";

  let inTag = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '<' || char === '&') inTag = true;
    if (char === '>' || char === ';') inTag = false;

    if (!inTag && /[a-zA-Z]/.test(char)) {
      return text.slice(0, i) + char.toUpperCase() + text.slice(i + 1);
    }
  }
  return text;
};