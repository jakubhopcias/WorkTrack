export default function calculateTime(steps,rate){
    let totalTime = 0;

    steps.forEach((step) => {
        totalTime += step.duration;
    });

    return (totalTime * rate).toFixed(1)*1; 
}