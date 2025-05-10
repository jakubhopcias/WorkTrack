export default function calculateTime(steps,rate){
    let totalTime = 0;

    steps.forEach((step) => {
        
        const start = new Date(`1970-01-01T${step.start}:00`);
        const end = new Date(`1970-01-01T${step.end}:00`);
        if (end < start) {
            end.setDate(end.getDate() + 1); // add a day if end time is less than start time
        }
        const timeDiff = (end - start) / (1000 * 60 * 60); // difference in hours
        totalTime += timeDiff;
    });

    return (totalTime * rate).toFixed(1); // total cost
}