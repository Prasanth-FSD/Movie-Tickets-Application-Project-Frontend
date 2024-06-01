# Movie Ticket Booking System Frontend

This frontend codebase provides the user interface for a movie ticket booking system. It includes features such as user registration and login, password reset, movie selection, theater selection, and ticket booking.

### Features:
1. **User Authentication:**
   - User registration with validation for username, email, and password.
   - User login with validation and authentication.
   - Forgot password functionality with email verification for password reset.

2. **Movie Selection:**
   - Display a list of movies available for booking.
   - Allow users to select a movie for booking.

3. **Theater Selection:**
   - Display available theaters for the selected movie.
   - Allow users to choose a theater, date, time, and seat number for booking.

4. **Ticket Booking:**
   - Handle booking requests by sending data to the backend API.
   - Display success or error messages upon booking attempt.

### Technologies Used:
- **React:** Frontend JavaScript library for building user interfaces.
- **React Router:** For routing and navigation within the application.
- **Formik:** Form library for handling form input and validation.
- **Yup:** JavaScript schema builder for validation.
- **Axios:** Promise-based HTTP client for making API requests.
- **React Toastify:** For displaying toast notifications.
- **CSS:** Styling for the user interface.

### Project Structure:
- **Components:** Contains reusable UI components for different pages.
- **Style:** Contains CSS files for styling components.
- **App.js:** Main component that defines routes and renders different pages.
- **Contexts:** Contains context providers for sharing data across components.

### Setting Up:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables if required.
4. Start the development server using `npm start`.

### Backend Integration:
Ensure the backend server is running and accessible to handle API requests from the frontend. Update the API endpoint URLs in the frontend code accordingly.

### Deployment:
- **Frontend GitHub Repository:** [Insert Frontend GitHub Repository Link]
- **Frontend Netlify Deployment:** [Insert Frontend Netlify Deployment Link]

### License:
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

### Notes:
- Implement additional features like seat selection, payment integration, and user profile management for enhanced functionality.
- Add error handling and validation to improve user experience and security.
- Test the application thoroughly across different devices and browsers to ensure compatibility.