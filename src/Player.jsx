import React from "react";
import Waveform from "./Waveform.jsx";
import axios from "axios";

const NUMBER_OF_BUCKETS = 100;

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percentComplete: 0
        };
    }
    componentDidMount() {
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

        axios({
                url: "/girl-from-ipanema.mp3",
                responseType: "arraybuffer",
            })
            .then(response => {
                var audioData = response.data;

                audioCtx.decodeAudioData(audioData, buffer => {
                    audioData = buffer.getChannelData(0);

                    let bucketDataSize = Math.floor(audioData.length / NUMBER_OF_BUCKETS);
                    let buckets = [];
                    for (var i = 0; i < NUMBER_OF_BUCKETS; i++) {
                        let startingPoint = i * bucketDataSize;
                        let endingPoint = i * bucketDataSize + bucketDataSize;
                        let max = 0;
                        for (var j = startingPoint; j < endingPoint; j++) {
                            if (audioData[j] > max) {
                                max = audioData[j];
                            }
                        }
                        let size = Math.abs(max);
                        buckets.push(size / 2);
                    }
                    this.setState({
                        buckets: buckets
                    });
                }, e => {
                    // callback for any errors with decoding audio data
                    console.log("Error with decoding audio data" + e.err);
                });
            })
            .catch(err => {
                // catch any errors with fetching the audio
                console.log(err);
            });

        setInterval(() => {
            this.setState({
                percentComplete: (this.state.percentComplete + 0.1) % 100
            });
        }, 100);
    }
    render() {
        return (<Waveform spaceBetweenBars={0.5} {...this.state}></Waveform>);
    }
}

export default Player;
