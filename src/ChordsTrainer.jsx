import { useCallback } from "react"
import { useImmer } from "use-immer"

const VOICE_LEADING_SCORE = 3
const SUCCESS_SCORE = 1
const FAILURE_SCORE = 0
const CHORD_TIMEOUT = 5 // seconds
const START_COUNTDOWN = 3 // seconds

const initialState = {
    topScore: 0,
    currentScore: 0,
    nextChord: null,
    remainingChordSequence: ["C", "G", "D"]
}

const StartButton = (props) => {
    return <button
        type="button"
        class="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        {...props}
    >
        Start
    </button>
}

export default () => {
    const [state, setState] = useImmer(initialState)

    const increaseScore = useCallback(() => {
        setState((draft) => {
            draft.currentScore += 1
        })
    }, [])

    return <div>
        <div>Top Score: {state.topScore}</div>
        <div>Score: {state.currentScore}</div>
        <StartButton onClick={increaseScore}/>
    </div>
}