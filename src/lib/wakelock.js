import { ACTIONS, dispatch } from "./store"

// Create a reference for the Wake Lock.
let wakeLock = null

export function getCurrentWakeLockState() {
    return wakeLock !== null
}

function notifyWakeLockChange(active) {
    dispatch({ type: ACTIONS.SET_WAKE_LOCK, payload: active })
}

export function requestWakeLock() {
    if (!("wakeLock" in navigator)) {
        return
    }
    
    if (wakeLock !== null) {
        // Already active
        return

    }
    console.log("Request wake lock")

    // create an async function to request a wake lock
    navigator.wakeLock.request("screen").then((lock) => {
        if (wakeLock !== null) {
            return
        }
        wakeLock = lock
        notifyWakeLockChange(true)
        console.log("wake lock active!")

        wakeLock.addEventListener("release", () => {
            console.log("Wake lock released!")
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
    console.log("Release wake lock")
    wakeLock?.release()
}
