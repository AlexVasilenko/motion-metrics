const data = [
  {
    id: 1,
    title: 'Auto Orica USA report setting',
    type: 'Payload Monitoring Report',
    enabled: false,
    timeZone: 'Asia/Aqtau UTC+5:00',
    reportTime: new Date(),
    repeat: [5],
    unit: 'm kg s',
    from: (new Date()).toString(),
    configuration: {
      equipment: ['Equip1', 'Equip2'],
      productivity: {
        enabled: true,
        value: 7.5,
      },
      timeUsage: {
        enabled: true,
        value: 450,
      },
      cycleStatistics: {
        enabled: true,
      },
      passBucketDistribution: {
        enabled: true,
        separateByShifts: true,
      },
      passBucketPayload: {
        enabled: true,
        showMovingAverage: true,
        showShiftColors: true,
        movingAveragePoints: 15,
      }
    }
  },
  {
    id: 2,
    title: 'Auto Orica USA report setting - Stub 2',
    type: 'Payload Monitoring Report',
    enabled: true,
    timeZone: 'Asia/Aqtau UTC+5:00',
    reportTime: new Date(),
    repeat: [1, 2, 3, 4, 5],
    unit: 'm kg s',
    from: (new Date()).toString(),
    configuration: {
      equipment: ['Equip1', 'Equip2'],
      productivity: {
        enabled: true,
        value: 7.5,
      },
      timeUsage: {
        enabled: true,
        value: 450,
      },
      cycleStatistics: {
        enabled: true,
      },
      passBucketDistribution: {
        enabled: true,
        separateByShifts: true,
      },
      passBucketPayload: {
        enabled: true,
        showMovingAverage: true,
        showShiftColors: true,
        movingAveragePoints: 15,
      }
    }
  },
  {
    id: 3,
    title: 'Auto Orica USA report setting - Stub 3',
    type: 'Payload Monitoring Report',
    enabled: true,
    timeZone: 'Asia/Aqtau UTC+5:00',
    reportTime: new Date(),
    repeat: [6, 7],
    unit: 'm kg s',
    from: (new Date()).toString(),
    configuration: {
      equipment: ['Equip1', 'Equip2'],
      productivity: {
        enabled: true,
        value: 7.5,
      },
      timeUsage: {
        enabled: true,
        value: 450,
      },
      cycleStatistics: {
        enabled: true,
      },
      passBucketDistribution: {
        enabled: true,
        separateByShifts: true,
      },
      passBucketPayload: {
        enabled: true,
        showMovingAverage: true,
        showShiftColors: true,
        movingAveragePoints: 15,
      }
    }
  },
]

export default data
