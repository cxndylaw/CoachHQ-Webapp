// Unified student data structure
export const STUDENTS_DB = [
  {
    id: 1,
    name: 'Lee Smith',
    level: 'Advanced',
    age: 22,
    dob: '12/03/2002',
    contact: '0412 345 678',
    address: '5 Pine St, Sydney NSW 2000',
    sessions: 24,
    currentRatings: { Technique: 5, Footwork: 5, Speed: 4, Stamina: 3, Tactics: 4 },
    upcomingSessions: [
      { id: 1, day: 'Monday', time: '5:00–6:00 pm', drill: 'Full Court Footwork', recurring: true },
      { id: 2, day: 'Wednesday', time: '5:00–6:00 pm', drill: 'Smash Technique', recurring: true },
      { id: 3, day: 'Friday', time: '6:00–7:00 pm', drill: 'Net Play', recurring: true },
    ]
  },
  {
    id: 2,
    name: 'Jordan Davis',
    level: 'Inter',
    age: 19,
    dob: '04/07/2005',
    contact: '0421 234 567',
    address: '12 Oak Ave, Melbourne VIC 3000',
    sessions: 18,
    currentRatings: { Technique: 3, Footwork: 3, Speed: 4, Stamina: 3, Tactics: 2 },
    upcomingSessions: [
      { id: 4, day: 'Tuesday', time: '4:00–5:00 pm', drill: 'Drop Shot', recurring: true },
      { id: 5, day: 'Thursday', time: '5:00–6:00 pm', drill: 'Serve Practice', recurring: true },
    ]
  },
  {
    id: 3,
    name: 'Alex Thompson',
    level: 'Advanced',
    age: 25,
    dob: '19/11/1999',
    contact: '0433 456 789',
    address: '8 Elm Rd, Brisbane QLD 4000',
    sessions: 16,
    currentRatings: { Technique: 5, Footwork: 4, Speed: 5, Stamina: 4, Tactics: 4 },
    upcomingSessions: [
      { id: 6, day: 'Wednesday', time: '6:00–7:00 pm', drill: 'Advanced Tactics', recurring: true },
    ]
  },
  {
    id: 4,
    name: 'Sam Martinez',
    level: 'Beginner',
    age: 16,
    dob: '22/05/2008',
    contact: '0444 567 890',
    address: '3 Birch Ln, Perth WA 6000',
    sessions: 12,
    currentRatings: { Technique: 2, Footwork: 2, Speed: 3, Stamina: 2, Tactics: 1 },
    upcomingSessions: [
      { id: 7, day: 'Thursday', time: '4:00–5:00 pm', drill: 'Net Play Basics', recurring: false },
      { id: 8, day: 'Saturday', time: '10:00–11:00 am', drill: 'Footwork Intro', recurring: true },
    ]
  },
  {
    id: 5,
    name: 'Rachel Park',
    level: 'Inter',
    age: 20,
    dob: '08/09/2004',
    contact: '0455 678 901',
    address: '21 Cedar St, Adelaide SA 5000',
    sessions: 11,
    currentRatings: { Technique: 3, Footwork: 4, Speed: 3, Stamina: 3, Tactics: 3 },
    upcomingSessions: [
      { id: 9, day: 'Friday', time: '5:00–6:00 pm', drill: 'Serve Practice', recurring: true },
    ]
  },
]

export function getStudentById(id) {
  return STUDENTS_DB.find(s => s.id === id)
}

export function updateStudentRatings(studentId, newRatings) {
  const student = getStudentById(studentId)
  if (student) {
    student.currentRatings = { ...student.currentRatings, ...newRatings }
  }
}
