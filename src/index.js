import shuffleWithRandom from "./shuffle-with-random";
import registerSW from "./register-sw";
import "./styles.css";
import maybeShowInstall from "./maybe-show-install";

// Cache elements not to search for them every time
const $button = document.getElementById("shuffle-button");
const $textarea = document.getElementById("strings-input");

const ENABLE_DELAY = 200;

registerSW();
maybeShowInstall();

function removeErrorMessages() {
  for ($errorDiv of document.getElementsByClassName("error")) {
    $errorDiv.remove();
  }
}

$button.addEventListener("click", async () => {
  try {
    $button.disabled = true;
    $textarea.disabled = true;
    // Get textarea's content and split it into lines
    const lines = $textarea.value.split("\n");
    // ACTION!
    const shuffledLines = await shuffleWithRandom(lines);
    // Set textarea's content with shuffled lines
    $textarea.value = shuffledLines.join("\n");
    removeErrorMessages();
  } catch (error) {
    const $errorDiv = document.createElement("div");
    $errorDiv.className = "error";
    $errorDiv.innerText = `${error}`;
    $button.after($errorDiv);
  } finally {
    setTimeout(() => {
      $button.disabled = false;
      $textarea.disabled = false;
    }, ENABLE_DELAY);
  }
});
