import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const Waveform = (props) => {
    return (<div>
        <svg viewBox="0 0 100 100" className="waveform-container" preserveAspectRatio="none">
            <rect className="waveform-bg" x="0" y="0" height="100" width="100"/>
            <rect className="waveform-progress" x="0" y="0" height="100" width={props.percentComplete}/>
        </svg>

        <svg height="0" width="0">
            <defs>
                <clipPath id="waveform-mask">
                    {
                        props.buckets.map((bucketValue, i, buckets) => {
                            let bucketSVGWidth = 100.0 / buckets.length;
                            let bucketSVGHeight = bucketValue * 100.0;
                            return (<rect key={i} x={bucketSVGWidth * i + props.spaceBetweenBars / 2.0} y={(100 - bucketSVGHeight) / 2.0} width={bucketSVGWidth - props.spaceBetweenBars} height={bucketSVGHeight}/>);
                        })
                    }
                </clipPath>
            </defs>
        </svg>
    </div>);
};

Waveform.defaultProps = {
    buckets: [],
    percentComplete: 0,
    spaceBetweenBars: 0
};

Waveform.propTypes = {
    buckets: PropTypes.arrayOf(PropTypes.number),
    percentComplete: PropTypes.number,
    spaceBetweenBars: PropTypes.number
};

export default Waveform;
