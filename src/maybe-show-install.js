export default function maybeShowInstall() {
  // Initialize deferredPrompt for use later to show browser install prompt.
  let deferredPrompt = null;

  const $installButton = document.getElementById("install-button");

  async function install() {
    if (!deferredPrompt) {
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    $installButton.style.display = "block";
    $installButton.addEventListener("click", install);
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });
  window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    $installButton.style.display = "none";
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  });
}
