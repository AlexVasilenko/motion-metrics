export const repeatGenerate = (repeat) => {
    const joinRepeat = repeat.join(',');

    const daysAndPartOfDays = {
        '6,7': 'Weekend',
        '1,2,3,4,5': 'Weekdays',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        7: 'Sun'
    };

    if (daysAndPartOfDays[joinRepeat]) {
        return daysAndPartOfDays[joinRepeat]
    }

    return repeat.map(day => daysAndPartOfDays[day]).join(',');
}