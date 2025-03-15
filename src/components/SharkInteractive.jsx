import React, { useEffect, useState, useRef} from "react";
import SharkSVG from "../assets/sharkSVG.svg";
import anime from "animejs";

const SharkInteractive = ({isToggleOn}) => {
    const raisedFlipperPath = "m 1211.9986,683.75091 c -64.1123,-250.96332 106.2951,-78.89838 106.2951,-78.89838"
    const loweredFlipperPath = "m 1213,636 c -167,198 122.5,55 122.5,55"

    const rightOpen = "m 1327,348 c -2.3213,-5.83563 -5.8628,-15.24368 -14,-13.5 -1.3924,0.29837 -2.9611,0.52607 -4,1.5 -6.9017,6.47035 -7.3589,20.88621 -7,29.5 0.4112,9.86896 1.2442,13.54517 6,22 1.7694,3.14554 7.4437,11.06393 11.5,12 8.561,1.97562 19.7891,-9.12894 21,-17 1.3569,-8.82008 -1.6269,-23.84839 -5,-32 -0.9566,-2.31174 -4.3218,-9.20545 -7.5,-10 -0.755,-0.18874 -1.6087,0.58807 -2,1 -2.7646,2.91005 -5.8727,5.59625 -8,9 -4.0214,6.43418 -3.6325,26.09832 0,33 0.6587,1.25146 1.8686,2.15147 3,3 0.2667,0.2 0.6766,0.0808 1,0 4.0121,-1.00302 3.8645,-1.09353 5.5,-6 2.637,-7.91099 2.112,-16.66403 -0.5,-24.5 -0.8724,-2.61725 -2.192,-5.07094 -3.5,-7.5 -1.0303,-1.91332 -1.9634,-3.96341 -3.5,-5.5 -0.1862,-0.18616 -3.2182,-0.0636 -3.5,0.5 -1.0138,2.02759 -1.5692,4.27439 -2,6.5 -1.2945,6.68817 -1,10.36539 -1,17 0,1.83333 -0.4447,3.7214 0,5.5 0.2588,1.03532 1.0849,1.95094 2,2.5 0.8693,0.52159 1.9862,0.5 3,0.5 5.3715,0 6.2127,0.71641 9,-3 0.8062,-1.07497 1.6308,-2.20799 2,-3.5 0.6206,-2.17227 0.01,-7.72396 -0.5,-10 -0.4624,-2.08063 -2.9445,-3.11109 -4,-1";
    const rightClosed = "m 1303.1978,331.63308 31.8198,68.58936";
    
    const leftOpen = "m 956.5,293 c -1.5,0 -3.02913,-0.29418 -4.5,0 -1.09633,0.21926 -2.02267,0.95703 -3,1.5 -9.25699,5.14277 -15.06951,10.87697 -18,21.5 -0.85874,3.11292 -1.59435,10.21696 -0.5,13.5 1.11282,3.33847 4.92719,3 7.5,3 1.5,0 3.04079,0.34743 4.5,0 2.10774,-0.50185 4.16267,-1.35167 6,-2.5 9.35966,-5.84979 15.09832,-16.17984 16,-27 0.0101,-0.12101 0.29582,-7.22669 -0.5,-8.5 -0.39504,-0.63206 -1.3021,-0.73829 -2,-1 -8.64762,-3.24286 -19.91323,15.03305 -22.5,21.5 -0.76564,1.9141 -1,4 -1.5,6 -0.6773,2.7092 -1.73212,6.25358 -0.5,6.5 9.3812,1.87624 28.59194,-10.6782 25.5,-21.5 -0.59095,-2.06832 -3.90449,-3.8352 -5.5,-4.5 -6.87937,-2.8664 -13.21861,5.23375 -14.5,11 -0.0688,0.30982 -0.95562,6.04438 -0.5,6.5 1.31244,1.31245 5.98405,-0.8227 7,-1.5";
    const leftClosed = "m 964.49365,289.91378 -35.35534,43.13351";

    const svgRef = useRef(null);

    const [currrentFlipperPath, setCurrentFlipperPath] = useState(loweredFlipperPath);
    const [rightEyePath, setRightEyePath] = useState(rightOpen);
    const [leftEyePath, setLeftEyePath] = useState(leftOpen);

    let rightEyeAnimationIntervalRef = useRef(null);
    let leftEyeAnimationIntervalRef = useRef(null);
    let flipperAnimationIntervalRef = useRef(null);

    useEffect(() => {
        const animation = anime({
            targets: ['#shark-svg path','#flipper'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function(el, i) { return i * 250 }
          });
        
        return () => {
            animation.pause();
        };
    }, []);

    const getRandomBlinkInterval = () => {
        return Math.floor(Math.random() * 4000) + 2000;
    };

    const blinkEye = (eyeSetter, openState, closedState) =>{
        eyeSetter(closedState);

        setTimeout(() => {
            eyeSetter(openState);

            scheduleNextBlink(eyeSetter, openState, closedState);
        }, 150);
    };

    const scheduleNextBlink = (eyeSetter, openState, closedState) => {
        return setTimeout(() => {
            blinkEye(eyeSetter, openState, closedState);
        }, getRandomBlinkInterval());
    };

    const toggleFlipper = () =>{
        setCurrentFlipperPath(raisedFlipperPath);
        setTimeout(() => {
            setCurrentFlipperPath(loweredFlipperPath);
        }, 100);
    };

    const animateFlippers = () => {
        if (isToggleOn)
            startFlipperAnimation();
        else{
            setCurrentFlipperPath(loweredFlipperPath);
            clearInterval(flipperAnimationIntervalRef.current);
        }
    };

    const startFlipperAnimation = () => {
        flipperAnimationIntervalRef.current = setInterval(() => {
            setCurrentFlipperPath((prevPath) => prevPath === raisedFlipperPath ? loweredFlipperPath : raisedFlipperPath);
        }, 100);
    };

    const animateEyes = () =>{
        if (isToggleOn){
            setRightEyePath(rightOpen);
            setLeftEyePath(leftOpen);
            startEyeAnimation();
        } else{
            setRightEyePath(rightClosed);
            setLeftEyePath(leftClosed);
            clearTimeout(rightEyeAnimationIntervalRef.current);
            clearTimeout(leftEyeAnimationIntervalRef.current);
        }
    };

    const startEyeAnimation = () => {
        rightEyeAnimationIntervalRef.current = scheduleNextBlink(setRightEyePath, rightOpen, rightClosed);
        leftEyeAnimationIntervalRef.current = scheduleNextBlink(setLeftEyePath, leftOpen, leftClosed);
    }

    useEffect(() => {
        animateEyes();
        animateFlippers();
    }, [isToggleOn]);

    useEffect(() => {
        if (svgRef.current) {
            const rightEye = svgRef.current.querySelector('.right-open');
            const leftEye = svgRef.current.querySelector('.left-open');
            if (leftEye && rightEye) {
                leftEye.setAttribute("d", leftEyePath);
                rightEye.setAttribute("d", rightEyePath);
            }
        }
    }, [leftEyePath, rightEyePath]);

    useEffect(() => {
        const handleKeyPress = () => {
                toggleFlipper();
        };
        if (!isToggleOn)
            document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            clearTimeout(rightEyeAnimationIntervalRef.current);
            clearTimeout(leftEyeAnimationIntervalRef.current);
            clearInterval(flipperAnimationIntervalRef.current);
        };
    }, [isToggleOn]);


    return (
        <>  
            <div onClick = {!isToggleOn ? toggleFlipper: () => {}} className={`flex justify-center items-center w-screen h-screen`}>
                <svg ref = {svgRef} viewBox="0 0 1920 917" width = "100%" height="100%">
                    <SharkSVG />
                    <path 
                    d = {currrentFlipperPath}
                    stroke = "var(--light-blue-colour)" 
                    fill="var(--background-colour)" 
                    strokeWidth="8" 
                    strokeLinecap = "round"
                    id = "flipper"/>
                </svg>
            </div> 
        </>
    )
}

export default SharkInteractive;


// const [isAnimationRunning, setIsAnimationRunning] = useState(false);
// checkRaisedFlipper(!isFlipperRaised);
        // const flipperPath = isFlipperRaised ? raisedFlipperPath : loweredFlipperPath;
        // setNewFlipperPath(<path d = {flipperPath} stroke = "var(--light-blue-colour)" fill="var(--background-colour)" stroke-width="8" stroke-linecap = "round"/>);