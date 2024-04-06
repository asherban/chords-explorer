// Source: https://github.com/markacola/react-vexflow/blob/master/src/index.js
// License: MIT
// Credit: https://github.com/markacola 

import { useRef, useEffect } from 'react';
import VexFlow from 'vexflow';
import PropTypes from 'prop-types';

const { Factory } = VexFlow.Flow

function Score({ notes }) {
    const container = useRef()

    useEffect(() => {
        const vf = new Factory({ renderer: { elementId: container.current } });
        const score = vf.EasyScore();
        const system = vf.System();

        const voice = notes.length > 0 ? [score.voice(score.notes("(" + notes.join(' ') + ")/1"))] : [];

        system.addStave({
            voices: voice,
        }).addClef('treble');

        // Draw it!
        vf.draw();

        return () => {
            vf.getContext().svg.remove();
        }
    }, [notes])

    return <div ref={container} style={{ width: '100%' }} />
}
Score.propTypes = {
    notes: PropTypes.array.isRequired
}

export default Score;