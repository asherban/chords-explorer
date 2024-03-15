import { useEffect, useState, useCallback } from "react"
import { getCurrentWakeLockState } from "./wakelock"

function MidiInfo({ inputs }) {
    return (
        <a class="p-1 text-gray-400 rounded-full focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span class="sr-only">
                Midi Info
            </span>
            <div className="relative">
                <svg width="45px" height="45px" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 14.5C8 12.685 8.705 10.941 9.966 9.636C11.227 8.331 12.946 7.566 14.76 7.504L15 7.5H17C18.773 7.501 20.479 8.174 21.775 9.383C23.071 10.593 23.86 12.249 23.983 14.017L23.996 14.257L24.006 14.677C24.049 15.41 24.36 16.102 24.88 16.622C25.399 17.141 26.091 17.452 26.824 17.495L27 17.5H30C32.078 17.5 34.075 18.309 35.568 19.755C37.06 21.202 37.931 23.173 37.996 25.25L38 25.5V33.5C38 33.745 37.91 33.981 37.747 34.164C37.585 34.347 37.36 34.464 37.117 34.493L37 34.5H36V37.5H34V34.5H12V37.5H10V34.5H9C8.755 34.5 8.519 34.41 8.336 34.247C8.153 34.085 8.036 33.86 8.007 33.617L8 33.5V14.5ZM12 26.5H10V32.5H36V26.5H34M16 26.5H14H16ZM20 26.5H18H20ZM24 26.5H22H24ZM28 26.5H26H28ZM32 26.5H30H32ZM17 9.5H15C13.712 9.5 12.473 9.998 11.542 10.889C10.612 11.78 10.061 12.996 10.005 14.283L10 14.5V24.5H35.915L35.899 24.398C35.656 23.102 34.994 21.921 34.013 21.039C33.033 20.157 31.789 19.622 30.474 19.518L30.224 19.504L30 19.5H27C24.311 19.5 22.118 17.378 22.005 14.734L21.997 14.312C21.948 13.019 21.401 11.796 20.469 10.898C19.537 10.001 18.294 9.5 17 9.5Z"
                        fill="#FFF" />
                    <path d="M14 30.5H11.994V24.934H14V30.5Z" fill="#3C3C3C" />
                    <path d="M18 30.5H15.994V24.934H18V30.5Z" fill="#3C3C3C" />
                    <path d="M22 30.5H19.994V24.934H22V30.5Z" fill="#3C3C3C" />
                    <path d="M26 30.5H23.994V24.934H26V30.5Z" fill="#3C3C3C" />
                    <path d="M30 30.5H27.994V24.934H30V30.5Z" fill="#3C3C3C" />
                    <path d="M34 30.5H31.994V24.934H34V30.5Z" fill="#3C3C3C" />
                </svg>
                <span className="absolute top-0 right-0 inline-block px-1 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{inputs}</span>
            </div>
        </a>
    )
}

function WakeLockInfo({ active }) {
    const label = active ? "Wake Lock" : ""

    return <a className="p-1 text-gray-400 rounded-full focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" >
        <span class="sr-only">
            {label}
        </span>
        {label}
    </a >
}

function MenuItem({ name, active, setActive }) {
    const classes = active ? "text-gray-800 dark:text-white hover:text-gray-800 dark:hover:text-white" : "text-gray-300 hover:text-gray-800 dark:hover:text-white"
    const allClasses = `${classes} px-3 py-2 rounded-md text-sm font-medium`

    return <a className={allClasses} href="/#" onClick={setActive}>
        {name}
    </a>
}

export default function ({ activeTab, setActiveTab }) {
    const [inputs, setInputs] = useState(0)
    const onMidiDevicesChange = useCallback(({ detail }) => setInputs(detail.count), [])
    useEffect(() => {
        document.addEventListener("midideviceschange", onMidiDevicesChange)

        return () => document.removeEventListener("midideviceschange", onMidiDevicesChange)
    }, [])

    const [wakeLockState, setWakeLockState] = useState(getCurrentWakeLockState())
    const onWakeLockStateChange = useCallback(({ detail }) => setWakeLockState(detail.active), [])
    useEffect(() => {
        document.addEventListener("wakelockstatechange", onWakeLockStateChange)

        return () => document.removeEventListener("wakelockstatechange", onWakeLockStateChange)
    }, [])

    return (
        <div>
            <nav class="bg-white dark:bg-gray-800  shadow ">
                <div class="px-8 mx-auto max-w-7xl">
                    <div class="flex items-center justify-between h-16">
                        <div class=" flex items-center">
                            <h1 class="flex-shrink-0 text-gray-200 dark:tet-white">
                                Chords Explorer
                            </h1>
                            <div class="md:block">
                                <div class="flex items-baseline ml-10 space-x-4">
                                    <MenuItem name="Play" active={activeTab == "play"} setActive={() => setActiveTab("play")} />
                                    <MenuItem name="Learn" active={activeTab == "learn"} setActive={() => setActiveTab("learn")} />
                                </div>
                            </div>
                        </div>
                        <div class="block">
                            <div class="flex items-center ml-4 md:ml-6">
                                <WakeLockInfo active={wakeLockState} />
                                <MidiInfo inputs={inputs} />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}    