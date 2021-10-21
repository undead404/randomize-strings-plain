import shuffle from "./utils/shuffle";

// Cache elements not to search for them every time
const $button = document.getElementById("shuffle-button");
const $textarea = document.getElementById("strings-input");

$button.addEventListener("click", () => {
  try {
    $button.disabled = true;
    // Get textarea's content and split it into lines
    const lines = $textarea.value.split("\n");
    // ACTION!
    const shuffledLines = shuffle(lines);
    // Set textarea's content with shuffled lines
    $textarea.value = shuffledLines.join("\n");
  } finally {
    $button.disabled = false;
  }
});
