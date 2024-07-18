import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
// @ts-ignore
import AnimatedNumber from 'react-animated-number';

import * as confetti from '@/styles/lotties/confetti.json'
import * as goButton from '@/styles/lotties/goButton.json'
import * as finish from '@/styles/lotties/finish.json'
import * as blockLoader from '@/styles/lotties/blockLoader.json'

const MIN = Number(process.env.NEXT_PUBLIC_MINIMUM_TX);
const MAX = Number(process.env.NEXT_PUBLIC_MAXIMUMU_TX);
const TOTAL = Number(process.env.NEXT_PUBLIC_TOTAL_TX);

const LandingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        if (currentStep === 1) {
            setTimeout(() => {
                setCurrentStep(2)
            }, 2500)
        }

    }, [currentStep])

    useEffect(() => {
        if (total >= TOTAL) {
            setTimeout(() => {
                setCurrentStep(3)
            }, 2000)
        }
    }, [total])

    useEffect(() => {
        const intervalId = setInterval(() => {
        const randomNumber = getRandomNumber(MIN, MAX);
        setTotal(prevTotal => {
            const updatesNumber = prevTotal + randomNumber
            if (updatesNumber >= TOTAL) {
                clearInterval(intervalId);
            }
            return prevTotal + randomNumber
        });
        }, 2500);
    
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getAnimationRender = () => {
        switch(currentStep) {
            case 0:
                return (
                    <div className="lottieWrapper" onClick={() => setCurrentStep(1)}>
                        <div className='goWrapper'>
                            <Lottie 
                                options={{
                                    loop: true,
                                    autoplay: true, 
                                    animationData: goButton,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }}
                                }
                                height={300}
                                width={300}
                            />
                        </div>
                    </div>
            )
            case 1:
                return (
                    <div className="lottieWrapper" onClick={() => setCurrentStep(2)}>
                        <div className='animationWrapper'>
                            <Lottie 
                                options={{
                                    loop: true,
                                    autoplay: true, 
                                    animationData: confetti,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }}
                                }
                                height={400}
                                width={400}
                            />
                            <div className='loadingText ibm-mono'>
                                LOADING
                            </div>
                        </div>
                    </div>
            )
            case 2:
                return (
                    <div className="lottieWrapper">
                        <div className='animationWrapper'>
                            <div className='countingWrapper'>
                                <Lottie 
                                    options={{
                                        loop: true,
                                        autoplay: true, 
                                        animationData: blockLoader,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice'
                                        }}
                                    }
                                    height={260}
                                    width={260}
                                />
                                <div className='currentConfirms ibm-mono'>
                                    <AnimatedNumber
                                        component='text'
                                        value={total >= TOTAL ? TOTAL : total}
                                        style={{
                                            fontWeight: 'bold',
                                            transition: '0.8s ease-out',
                                            fontSize: 68,
                                            transitionProperty: 'background-color, color, opacity',
                                            color: '#00B359',
                                        }}
                                        duration={1200}
                                        stepPrecision={0}
                                        initialValue={0}
                                    />
                                </div>
                                <div className='totalConfirms ibm-mono'>/{TOTAL}</div>
                                <div className='transactionText ibm-mono'>Transactions</div>
                            </div>
                        </div>
                    </div>
            )
            case 3:
                return (
                    <div className='animationWrapper'>
                        <Lottie 
                            options={{
                                loop: true,
                                autoplay: true, 
                                animationData: finish,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }}
                            }
                            height={'100%'}
                            width={'100%'}
                        />
                        <div className='ibm-mono maskingText'>
                            Thank you for joining!
                        </div>
                </div>
            )
        }
    }


    return (
        <>
            <div className='headerWrapper ibm-mono'>
                <img className='logoImg' src='https://static.bitkubnext.com/bitkub-next/logo/bbt-white-logo.png' />
                <div className='divider' />
                <div>
                    BKCDM #4
                </div>
            </div>
            <div className="landing-background landing-container">
                <div className="lottieWrapper" >
                        {getAnimationRender()}
                </div>
            </div>
        </>
    )
}

export default LandingPage;