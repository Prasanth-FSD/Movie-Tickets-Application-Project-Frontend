import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './AdminPanel.css'; // Import CSS file for styling
import axios from 'axios';
import { MovieContext } from './AdminPanel';

const AddTheaters = () => {
  const { movieId } = useContext(MovieContext);

  return (
    <div className="add-theater-container">
      <h2>Add Theater</h2>
      <Formik
        initialValues={{
          theaterName: '',
          theaterAmenties: [],
          screenTimings: [],
        }}
        validationSchema={Yup.object({
          theaterName: Yup.string().required('Theater Name is required'),
          theaterAmenties: Yup.string().required('Theater Amenties is required'),
          screenTimings: Yup.string().required('Screen Timings is required'),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Split screenTimings into an array of strings
          const formattedValues = {
            ...values,
            theaterAmenties:values.theaterAmenties.split(',').map(item => item.trim()),
            screenTimings: values.screenTimings.split(',').map(time => time.trim())
          };
    

        //  axios.post(`http://localhost:8500/uploadapi/admin/uploadtheater/${movieId}`, formattedValues)
          axios.post(`https://movie-tickets-application-project-backend.onrender.com/uploadapi/admin/uploadtheater/${movieId}`, formattedValues)
            .then(response => {
              console.log(response.data, movieId);
              toast.success('Theater added successfully');
              resetForm();
            })
            .catch(error => {
              console.error('Error adding theater:', error);
              toast.error('An error occurred while adding the theater');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="theaterName">Theater Name:</label>
            <Field type="text" id="theaterName" name="theaterName" />
            <ErrorMessage name="theaterName" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="theaterAmenties">Theater Amenties:</label>
            <Field type="text" id="theaterAmenties" name="theaterAmenties" />
            <ErrorMessage name="theaterAmenties" component="div" className="error" />
          </div>
          <div className="form-group">
            <label htmlFor="screenTimings">Screen Timings:</label>
            <Field type="text" id="screenTimings" name="screenTimings" />
            <ErrorMessage name="screenTimings" component="div" className="error" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTheaters;
