// Cache elements not to search for them every time
const $button = document.getElementById("shuffle-button");
const $textarea = document.getElementById("strings-input");

/**
 * Returns new array with shuffled items
 * @param {Array} array
 * @returns {Array} shuffled array
 */
function shuffle(array) {
  const shuffledArray = [...array];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}

$button.addEventListener("click", () => {
  $button.disabled = true;
  // Get textarea's content and split it into lines
  const lines = $textarea.value.split("\n");
  // ACTION!
  const shuffledLines = shuffle(lines);
  // Set textarea's content with shuffled lines
  $textarea.value = shuffledLines.join("\n");
  $button.disabled = false;
});
