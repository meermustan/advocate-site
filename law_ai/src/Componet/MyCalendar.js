import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
const localizer = momentLocalizer(moment);




const MyCalendar = ({ events, onHandleMeetingEvent }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    let meet = [];
    events.forEach((eve) => { 
      meet.push({
        id: eve._id,
        start: moment(eve.start).toDate(),
        end: moment(eve.end).toDate(),
        title: eve.title,
        stats: eve.stats,
        meeting_url: eve.meeting_url,
      });
    });
    setMeetings(meet);
  }, [events]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={meetings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event)=>{onHandleMeetingEvent(event)}}
      />
    </div>
  );
};

export default MyCalendar;

// import ApiCalendar from "react-google-calendar-api";
// import React from "react";
// const config = {
//   clientId:
//     "956712160620-9p7553jclc003arbjg3j0hq5smu7a8a0.apps.googleusercontent.com",
//   apiKey: "AIzaSyBGEd8BYeLfBVyf4NAhYl1L3zn0lPtynLc",
//   scope: "https://www.googleapis.com/auth/calendar",
//   discoveryDocs: [
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
//   ],
// };
// const apiCalendar = new ApiCalendar(config);

// export default class DoubleButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleItemClick = this.handleItemClick.bind(this);
//   }

//   handleItemClick(event, name) {
//     if (name === "sign-in") {
//       apiCalendar.handleAuthClick();
//     } else if (name === "sign-out") {
//       apiCalendar.handleSignoutClick();
//     }
//   }

//   render() {
//     return (
//       <>
//         <button onClick={(e) => this.handleItemClick(e, "sign-in")}>
//           sign-in
//         </button>
//         <button onClick={(e) => this.handleItemClick(e, "sign-out")}>
//           sign-out
//         </button>
//       </>
//     );
//   }
// }
