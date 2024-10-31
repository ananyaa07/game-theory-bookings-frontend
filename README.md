# Game Theory Bookings

Game Theory Bookings is a React-based platform that allows users to book sports facilities easily, view existing bookings, and manage resources within sports centers. The application provides different levels of access and functionality based on the user’s role: customer, operations, or admin.

## Features

### User Roles
- **Customer**: Can create and view bookings.
- **Operations**: Manages resources, creates facilities, and schedules tournaments.
- **Admin**: Promotes users to operations role and has access to additional management tools.

### Main Functionalities
1. **Login and Signup**  
   - New users can register and existing users can log in. Login is required to access most app features.

2. **Booking Management**
   - **Create Booking**: Allows customers to select a facility, choose a sport, and book a time slot.
   - **View Bookings**: Customers can view their past and upcoming bookings with detailed information about each booking.

3. **Admin and Operations Controls**
   - **Promote Users**: Admins can promote customers to the operations role.
   - **Create Sports Center**: Operations can add new sports centers.
   - **Create Resources**: Operations can add new resources (e.g., courts, equipment) for use within a sports center.
   - **Create Sport Types**: Operations can add various sports to a facility and manage its availability.

4. **Booking Visualization**
   - **Time-wise Bookings**: Operations can view bookings in a calendar format, broken down by resources and scheduled by time slots.

5. **Protected Routes**
   - The app restricts access to specific routes based on the user's role, ensuring that only authorized users can access sensitive areas.

## Project Setup

This project was initialized with [Create React App](https://github.com/facebook/create-react-app) and includes Tailwind CSS for styling and Axios for API requests.

### Prerequisites

- Node.js and npm installed
- API Base URL: Set the environment variable `REACT_APP_API_BASE_URL` to the base URL of the backend API.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ananyaa07/game-theory-bookings.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

Set up a `.env` file in the project root with the following environment variable:
```
REACT_APP_API_BASE_URL=your_api_base_url_here
```

## Component Overview

### Key Components

- **Navbar**: Provides navigation based on the user’s role, with quick access to relevant features.
- **ProtectedRoute**: Restricts access to routes based on user authentication status.
- **AuthContext**: Manages the current user state, including authentication and token storage.
- **Pages**:
   - **HomePage**: Introductory page with an overview of the app’s functionality.
   - **Login & Signup**: Handles user authentication.
   - **CreateBooking**: Allows customers to book a slot in a selected sports center.
   - **ViewBookings**: Displays all bookings made by the user.
   - **Promote**: Enables admins to promote customers to the operations role.
   - **TimeWiseBookings**: Displays bookings on a time-based calendar, useful for operations management.

### Styling

Tailwind CSS is used for quick and responsive styling, with custom classes to align with the app’s color scheme and layout requirements.

---

### Built With

- **React**: JavaScript library for building user interfaces.
- **React Router**: Manages navigation and routes within the app.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Datepicker**: For selecting booking dates.
- **FullCalendar**: A JavaScript calendar library used in the Operations panel for viewing bookings by time.


### Deployment

The app is deployed on Vercel and can be accessed [here](https://game-theory-bookings.vercel.app/home).