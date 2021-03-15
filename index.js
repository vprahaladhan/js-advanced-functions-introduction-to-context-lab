// Your code here
const createEmployeeRecord = (empDetails) => {
  return {
    firstName: empDetails[0],
    familyName: empDetails[1],
    title: empDetails[2],
    payPerHour: empDetails[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = empRecords => {
  let employeeRecords = [];

  for (const empRecord of empRecords) {
    employeeRecords.push(createEmployeeRecord(empRecord));
  }

  return employeeRecords;
}

const createTimeInEvent = (employeeRecord, dateTimeStamp) => {
  employeeRecord.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(dateTimeStamp.slice(-4)),
    date: dateTimeStamp.slice(0, 10)
  })
  return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateTimeStamp) => {
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(dateTimeStamp.slice(-4)),
    date: dateTimeStamp.slice(0, 10)
  })
  return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateStamp) => {
  let timeIn, timeOut;

  for (const timeInEvent of employeeRecord.timeInEvents) {
    if (timeInEvent.date === dateStamp) {
      timeIn = timeInEvent.hour;
    }
  };

  for (const timeOutEvent of employeeRecord.timeOutEvents) {
    if (timeOutEvent.date === dateStamp) {
      timeOut = timeOutEvent.hour;
    };
  };

  console.log('Hrs worked >> ', (timeOut - timeIn) / 100);
  return (timeOut - timeIn) / 100;
};

const wagesEarnedOnDate = (employeeRecord, dateStamp) => {
  return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
};

const allWagesFor = employeeRecord => {
  let totalWages = 0;

  for (const timeIn of employeeRecord.timeInEvents) {
    totalWages += wagesEarnedOnDate(employeeRecord, timeIn.date);
  };

  return totalWages;
}

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find(employee => employee.firstName === firstName);
}

const calculatePayroll = employeeRecords => {
  let totalWagesForAllEmployees = 0;

  employeeRecords.forEach(empRecord => totalWagesForAllEmployees += allWagesFor(empRecord));

  return totalWagesForAllEmployees;
}

