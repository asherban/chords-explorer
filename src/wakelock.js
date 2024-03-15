// Create a reference for the Wake Lock.
let wakeLock = null

export function getCurrentWakeLockState() {
    return wakeLock !== null
}

function notifyWakeLockChange(active) {
    const event = new CustomEvent("wakelockstatechange", { detail: { active } })
    document.dispatchEvent(event)
    console.log("WakeLock State Change", active)
}

export function requestWakeLock() {
    if (!("wakeLock" in navigator)) {
        return
    }

    if (wakeLock !== null) {
        // Already active
        return
    }

    // create an async function to request a wake lock
    navigator.wakeLock.request("screen").then((lock) => {
        wakeLock = lock
        notifyWakeLockChange(true)

        wakeLock.addEventListener("release", () => {
            // the wake lock has been released
            wakeLock = null
            notifyWakeLockChange(false)
        });

    }).catch((err) => {
        // The Wake Lock request has failed - usually system related, such as battery.
        wakeLock = null
        console.log(`${err.name}, ${err.message}`);
    })
}

export function releaseWakeLock() {
    wakeLock?.release()
}
