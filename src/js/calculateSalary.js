export default function calculateTime(steps = [], rate) {
    let totalTime = 0;

    if (!Array.isArray(steps)) return 0;

    steps.forEach((step) => {
        totalTime += step.duration;
    });

    return (totalTime * rate).toFixed(1) * 1;
}