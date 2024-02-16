// Create a reference for the Wake Lock.
let wakeLock = null
let webLockState = false

export function getCurrentWakeLockState() {
    return webLockState
}

function notifyWakeLockChange(active) {
    webLockState = active
    const event = new CustomEvent("wakelockstatechange", { detail: { active } })
    document.dispatchEvent(event)
    console.log("WakeLock State Change", active)
}

export function initializeWakeLock() {
    if (!("wakeLock" in navigator)) {
        return
    }

    // create an async function to request a wake lock
    navigator.wakeLock.request("screen").then((lock) => {
        wakeLock = lock
        notifyWakeLockChange(true)

        wakeLock.addEventListener("release", () => {
            // the wake lock has been released
            notifyWakeLockChange(false)
        });
    
        document.addEventListener("visibilitychange", async () => {
            if (wakeLock !== null && document.visibilityState === "visible") {
                wakeLock = await navigator.wakeLock.request("screen");
                notifyWakeLockChange(true)
            }
        })

    }).catch((err) => {
        // The Wake Lock request has failed - usually system related, such as battery.
        wakeLock = null
        console.log(`${err.name}, ${err.message}`);
    })
}
