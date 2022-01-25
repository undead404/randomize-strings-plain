export default function registerSW() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        console.info("SW registered: ", registration);
      } catch (registrationError) {
        console.error("SW registration failed: ", registrationError);
      }
    });
  } else {
    console.warn("service workers not supported");
  }
}
