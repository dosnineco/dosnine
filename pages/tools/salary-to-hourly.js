import { useState } from 'react';

const SalaryCalculator = () => {
  const [annualSalary, setAnnualSalary] = useState('');
  const [monthlyWage, setMonthlyWage] = useState('');
  const [weeklyWage, setWeeklyWage] = useState('');
  const [dailyWage, setDailyWage] = useState('');
  const [hourlyWage, setHourlyWage] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');

  const calculateFromAnnualSalary = (annual) => {
    const hours = parseFloat(hoursPerWeek);
    if (!isNaN(annual) && !isNaN(hours) && hours > 0) {
      const monthly = annual / 12;
      const weekly = annual / 52;
      const daily = weekly / (hours / 5); // Assuming 5 working days per week
      const hourly = weekly / hours;

      setMonthlyWage(monthly.toFixed(2));
      setWeeklyWage(weekly.toFixed(2));
      setDailyWage(daily.toFixed(2));
      setHourlyWage(hourly.toFixed(2));
    }
  };

  const calculateFromMonthlyWage = (monthly) => {
    const annual = parseFloat(monthly) * 12;
    setAnnualSalary(annual.toFixed(2));
    calculateFromAnnualSalary(annual);
  };

  const calculateFromWeeklyWage = (weekly) => {
    const annual = parseFloat(weekly) * 52;
    setAnnualSalary(annual.toFixed(2));
    calculateFromAnnualSalary(annual);
  };

  const calculateFromDailyWage = (daily) => {
    const hours = parseFloat(hoursPerWeek);
    if (!isNaN(hours) && hours > 0) {
      const weekly = daily * (hours / 5); // Assuming 5 working days per week
      const annual = weekly * 52;
      setAnnualSalary(annual.toFixed(2));
      calculateFromAnnualSalary(annual);
    }
  };

  const calculateFromHourlyWage = (hourly) => {
    const hours = parseFloat(hoursPerWeek);
    if (!isNaN(hours) && hours > 0) {
      const weekly = hourly * hours;
      const annual = weekly * 52;
      setAnnualSalary(annual.toFixed(2));
      calculateFromAnnualSalary(annual);
    }
  };

  const handleCalculateClick = () => {
    if (annualSalary) calculateFromAnnualSalary(parseFloat(annualSalary));
    if (monthlyWage) calculateFromMonthlyWage(parseFloat(monthlyWage));
    if (weeklyWage) calculateFromWeeklyWage(parseFloat(weeklyWage));
    if (dailyWage) calculateFromDailyWage(parseFloat(dailyWage));
    if (hourlyWage) calculateFromHourlyWage(parseFloat(hourlyWage));
  };

  return (
    <div className=" w-full mx-auto mt-10 p-5  rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-5 text-center">Salary Calculator</h2>
      <div className="mb-4">
        <label className="block text-inherit">Annual Salary (JMD)</label>
        <input
          type="number"
          value={annualSalary}
          onChange={(e) => setAnnualSalary(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-inherit">Monthly Wage (JMD)</label>
        <input
          type="number"
          value={monthlyWage}
          onChange={(e) => setMonthlyWage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-inherit">Weekly Wage (JMD)</label>
        <input
          type="number"
          value={weeklyWage}
          onChange={(e) => setWeeklyWage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-inherit">Daily Wage (JMD)</label>
        <input
          type="number"
          value={dailyWage}
          onChange={(e) => setDailyWage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-inherit">Hourly Wage (JMD)</label>
        <input
          type="number"
          value={hourlyWage}
          onChange={(e) => setHourlyWage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-inherit">Hours per Week</label>
        <input
          type="number"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        onClick={handleCalculateClick}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Calculate
      </button>
    </div>
  );
};

export default SalaryCalculator;