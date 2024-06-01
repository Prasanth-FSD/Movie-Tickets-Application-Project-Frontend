import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { MovieContext } from './AdminPanel';
import AddTheaters from './AddTheaters';
import './AdminPanel.css'; // Ensure this is imported to apply the CSS

const AddMovies = () => {
  const {  setMovieId } = useContext(MovieContext);

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <Formik
        initialValues={{
          movietitle: '',
          image: '',
          censor: '',
          duration: '',
          language: '',
          genre: '',
          theater:[]
        }}
        validationSchema={Yup.object({
          movietitle: Yup.string().required('Movie title is required'),
          image: Yup.string().url('Invalid URL').required('Image URL is required'),
          censor: Yup.string().required('Censor rating is required'),
          duration: Yup.string().required('Duration is required'),
          language: Yup.string().required('Language is required'),
          genre: Yup.string().required('Genre is required'),
        })}
        onSubmit={(values, { setSubmitting,}) => {
         // axios.post('http://localhost:8500/uploadapi/admin/uploadmovie', values)
          axios.post('https://movie-tickets-application-project-backend.onrender.com/uploadapi/admin/uploadmovie', values)
            .then(response => {
              console.log(response.data);
              toast.success('Movie added successfully');
              setMovieId(response.data.data._id);
            })
            .catch(error => {
              console.error('Error adding movie:', error);
              toast.error('An error occurred while adding the movie');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="movietitle">Movie Title</label>
            <Field type="text" id="movietitle" name="movietitle" />
            <ErrorMessage name="movietitle" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <Field type="text" id="image" name="image" />
            <ErrorMessage name="image" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="censor">Censor Rating</label>
            <Field type="text" id="censor" name="censor" />
            <ErrorMessage name="censor" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <Field type="text" id="duration" name="duration" />
            <ErrorMessage name="duration" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <Field type="text" id="language" name="language" />
            <ErrorMessage name="language" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <Field type="text" id="genre" name="genre" />
            <ErrorMessage name="genre" component="div" className="error" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <AddTheaters />
    </div>
  );
};

export default AddMovies;
