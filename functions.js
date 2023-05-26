export function firstLetterUpperCase(string) {
   const firstLetter = string[0].toUpperCase();
   const restOfString = string.slice(1);
   const output = firstLetter + restOfString;

   return output;
}
