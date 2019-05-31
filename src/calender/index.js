import React, { Component } from 'react';
import './calender.scss';

 export default class Calender  extends Component {
   constructor(props) {
     super(props);
     const date = new Date().getDate();
     const month = new Date().getMonth();
     const year = new Date().getFullYear();
     const monthDays = [
       31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
     ]
     const months  = [
       'January', 'February', 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'
     ]
     monthDays[1]  = year%4 === 0 ? 29 : 28 ;

     const monthCode = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
     const yearCode = [4, 2, 0, 6, 4, 2, 0];

     this.state = {
       currentDate: date,
       date: date,
       start: date%7-2,
       days: monthDays[month],
       currentMonth: month,
       monthNumber: month,
       month: months[month],
       months: months,
       monthDays: monthDays,
       monthCode: monthCode,
       currentYear: year,
       year: year,
       yearCode : yearCode,
       monthView: false,
       yearView: false,
       selectedDay: date
     }
   }

   getNextMonth = () => {
     const { monthNumber, month, months, year } = this.state;

     let newMonthNumber;
     let newMonth;
     let newyear;
     if (monthNumber+1 === 12) {
       newMonthNumber = 0;
       newMonth = months[0];
       newyear = year+1;
     } else {
       newMonthNumber = monthNumber + 1;
       newMonth = months[monthNumber + 1];
       newyear = year;
     }

     console.log(1, newMonthNumber, newyear);

     const newStart = this.calenderReGenerate(1, newMonthNumber, newyear);

     this.setState({
       monthNumber: newMonthNumber,
       month: newMonth,
       year: newyear,
       start: newStart
     });
   }

   calenderReGenerate = (day, month, year) => {
     const { monthCode } = this.state;
     const lastTwoOfYear = year%100;
     const yearCalcCode = ((parseInt(lastTwoOfYear/4) + lastTwoOfYear)%7);
     const centuryCode = this.centuryCode(year);
     const leap = year%4 === 0 ? 1 : 0;
     let startDay = yearCalcCode + monthCode[month] + day + centuryCode - leap;
     startDay = startDay%7;
     return startDay;
   }

   centuryCode = (year) => {
     if (year >= 2300) {
       return 0;
     } else if (year >= 2200) {
       return 2;
     } else if (year >= 2100) {
       return 4;
     } else if (year >= 2000) {
       return 6;
     } else if (year >= 1900) {
       return 0;
     } else if (year >= 1800) {
       return 2;
     } else {
       return 4;
     }

   }

   getPrevMonth = () => {
     const { monthNumber, month, months, year } = this.state;

     let newMonthNumber;
     let newMonth;
     let newyear;
     if (monthNumber-1 === -1) {
       newMonthNumber = 11;
       newMonth = months[11];
       newyear = year-1;
     } else {
       newMonthNumber = monthNumber - 1;
       newMonth = months[monthNumber - 1];
       newyear = year;
     }

     const newStart = this.calenderReGenerate(1, newMonthNumber, newyear);

     this.setState({
       monthNumber: newMonthNumber,
       month: newMonth,
       year: newyear,
       start: newStart
     });

   }

   openMonthView = () => {
     this.setState((prev) => ({
       monthView: !prev.monthView,
       yearView: false
     }));
   }

   openYearView = () => {
     this.setState((prev) => ({
       yearView: !prev.yearView,
       monthView: false
     }));
   }

   changeMonth = (month) => {
     const { year, months } = this.state;
     const newStart = this.calenderReGenerate(1, month, year);
     this.setState((prev) => ({
       monthView: !prev.monthView,
       yearView: false,
       start : newStart,
       monthNumber: month,
       month: months[month]
     }));
   }

   changeYear = (selectedYear) => {
     const { year, monthNumber, months } = this.state;
     const newStart = this.calenderReGenerate(1, monthNumber, selectedYear);
     this.setState((prev) => ({
       monthView: false,
       yearView: false,
       start : newStart,
       monthNumber: monthNumber,
       month: months[monthNumber],
       year: selectedYear
     }));
   }

   prevYearCycle = () => {
     this.setState((prev) => ({
       year: prev.year-25
     }))
   }

   nextYearCycle = () => {
     this.setState((prev) => ({
       year: prev.year+25
     }))
   }

   selectDay = (day) => {
     this.setState({
       selectedDay: day
     });
   }

  render() {
    const { start, days, month, monthNumber, year, months, monthView, yearView, monthDays, selectedDay } = this.state;

    const dayLimit = monthNumber === 1? year%4 === 0 ? 29 : 28 : monthDays[monthNumber];

    console.log(month, monthNumber);

    const date = new Date().getDate();

    let calenderPart;

    if (!monthView && !yearView) {;
      const calender = [];
      let day = 1;
      let gap = 0;
      while(day != dayLimit+1) {
        if(start > gap) {
          gap++;
          calender.push(<li key={`gap${gap}`}> </li>);
        } else {
          let currentDay = day;
          calender.push(<li className="daysAllow" key={day} onClick={() => this.selectDay(currentDay)}> {day} </li>);
          day++;
        }
      }

      calenderPart = (
        <div className="calender-day-sequence">
        <li className="week-day-name"> Sun </li>
        <li className="week-day-name"> Mon </li>
        <li className="week-day-name"> Tue </li>
        <li className="week-day-name"> Wed </li>
        <li className="week-day-name"> Thu </li>
        <li className="week-day-name"> Fri </li>
        <li className="week-day-name"> Sat </li>
        {calender}
        </div>
      );

    } else if (monthView) {
      const monthsList = months.map((month, index)=> (<li key={month} onClick={() => this.changeMonth(index)}> {month} </li>));
      calenderPart = (
        <div className="calender-month-sequence">
          {monthsList}
        </div>
      );
    } else {
      let start;
      let end;
      let yearPeriod = year % 100;
      const yearBeginning = parseInt(year / 100);

      if (yearPeriod <= 25) {
        start = 1;
        end = 25;
      } else if (yearPeriod <=50 ) {
        start = 26;
        end = 50;
      } else if (yearPeriod <=75) {
        start = 51;
        end = 75;
      } else {
        start = 76;
        end = 100;
      }

      const yearsList = [];
      for (; start <= end; start = start + 1) {
        let newYear = yearBeginning * 100 + start;
        yearsList.push(<li key={start} onClick={() => this.changeYear(newYear)}> {newYear} </li>);
      }

      calenderPart = (
        <div className="calender-year-sequence">
          <div className="yearNavigate yearPrev" onClick={() => this.prevYearCycle()}> &#60; </div>
          <div className="yearNavigate yearNext" onClick={() => this.nextYearCycle()}> &#62; </div>
          {yearsList}
        </div>
      );
    }

    return (
      <div className="calender-container">
        <div className="calender-day">
          <h3> Calender </h3>
          <p className="selected-day"> {`${selectedDay} ${months[monthNumber]} ${year}`} </p>
        </div>
        <div className="calender">
          <div className="calender-year" onClick={this.openYearView}> {year} </div>
          <div className="calender-top"> <li onClick={this.getPrevMonth}> &#60; </li><li onClick={this.openMonthView}> { month } </li> <li onClick={this.getNextMonth}> &#62; </li> </div>

          { calenderPart }

        </div>
      </div>
    );
  }
}
