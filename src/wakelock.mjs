// Create a reference for the Wake Lock.
let wakeLock = null;

async function initializeWakeLock() {
    if (!("wakeLock" in navigator)) {
        console.log("weblock is not supported")
        return
    }


    console.log("Wake Lock supported")
    // create an async function to request a wake lock
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock is active!");
    } catch (err) {
        // The Wake Lock request has failed - usually system related, such as battery.
        console.log(`${err.name}, ${err.message}`);
    }

    wakeLock.addEventListener("release", () => {
        // the wake lock has been released
        console.log("Wake Lock has been released");
    });

    document.addEventListener("visibilitychange", async () => {
        if (wakeLock !== null && document.visibilityState === "visible") {
            wakeLock = await navigator.wakeLock.request("screen");
            console.log("Wake Lock has been reacquired")
        }
    });

}

export { initializeWakeLock as initializeWeblock }