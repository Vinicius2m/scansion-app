"use server";

function isHiato(word: string, i: number): boolean {
  const vowels = "aeiouáéíóúàèìòùâêîôûãõäëïöü";
  const char = word[i];
  const nextChar = word[i + 1];
  return vowels.includes(char) && vowels.includes(nextChar);
}

function isConsonantalGroup(char: string, nextChar: string): boolean {
  const groups: string[] = [
    "br",
    "bl",
    "cr",
    "cl",
    "dr",
    "fr",
    "fl",
    "gr",
    "gl",
    "pr",
    "pl",
    "tr",
    "vr",
    "ch",
    "lh",
    "nh",
    "gu",
    "qu",
  ];
  return groups.includes(char + nextChar);
}

function separateSyllables(word: string): string[] {
  const vowels = "aeiouáéíóúàèìòùâêîôûãõäëïöü";
  const consonants = "bcdfghjklmnpqrstvwxyzç";
  const diphthongs = ["ai", "ei", "oi", "ui", "au", "eu", "ou"];
  const exceptions = new Map([
    // Adicione aqui as palavras irregulares e suas divisões silábicas
    ['ps', ['p', 's']],
    ['gn', ['g', 'n']],
  ]);

  const syllables: string[] = [];
  let currentSyllable: string = "";
  let i = 0;

  while (i < word.length) {
    const char = word[i].toLowerCase();
    const nextChar = word[i + 1]?.toLowerCase() || '';

    if (exceptions.has(char + nextChar)) {
      syllables.push(exceptions.get(char + nextChar)![0]);
      syllables.push(exceptions.get(char + nextChar)![1]);
      i++;
    } else {
      currentSyllable += char;

      if (vowels.includes(char)) {
        if (nextChar && diphthongs.includes(char + nextChar)) {
          currentSyllable += nextChar;
          i++;
        } else if (consonants.includes(nextChar) || nextChar === '' || isHiato(word, i)) {
          syllables.push(currentSyllable);
          currentSyllable = "";
        }
      } else if (consonants.includes(char)) {
        if (isConsonantalGroup(char, nextChar)) {
          currentSyllable += nextChar;
          i++;
        } else if (vowels.includes(word[i - 1]) && !vowels.includes(char)) {
          syllables.push(currentSyllable);
          currentSyllable = "";
        }
      }
    }

    i++;
  }

  if (currentSyllable) {
    syllables.push(currentSyllable);
  }

  return syllables;
}

const scansion = (poem: string): string => {
  const verses = poem.split("\n");
  let result = "";

  console.log(verses);

  verses.forEach((verse, index) => {
    const regex = /[,.!?;:]/g;
    const cleanedVerse = verse.replace(regex, '');
    const syllables = cleanedVerse.split(" ").map((word) =>
      separateSyllables(word).join("-")
    );
    result += `Verso ${index + 1}: ${syllables.join(" ")}\n`;
  });

  return result;
};

const handleScansion = (formData: { poem: string }) => {
  const poem = formData.poem;
  return scansion(poem);
};

export default handleScansion;
