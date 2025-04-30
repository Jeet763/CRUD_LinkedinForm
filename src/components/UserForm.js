import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../features/users/usersSlice';

const UserForm = ({ existingUser, onClose }) => {
  const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: existingUser || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      education: [{ degree: '', college: '', startYear: '', endYear: '' }],
      experience: [{ company: '', startDate: '', endDate: '' }],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const onSubmit = data => {
    if (existingUser) {
      dispatch(updateUser({ id: existingUser.id, ...data }));
    } else {
      dispatch(addUser(data));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        {existingUser ? 'Edit User' : 'Add New User'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            fullWidth
            {...register('firstName', { required: 'First name is required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            fullWidth
            {...register('lastName', { required: 'Last name is required' })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            fullWidth
            {...register('phone', { required: 'Phone number is required' })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('dob', { required: 'Date of birth is required' })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            multiline
            rows={4}
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        {/* Education Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Education</Typography>
          {educationFields.map((item, index) => (
            <Box key={item.id} mb={2} border={1} borderRadius={2} p={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    label="Degree"
                    fullWidth
                    {...register(education.${index}.degree, {
                      required: 'Degree is required',
                    })}
                    error={!!errors.education?.[index]?.degree}
                    helperText={errors.education?.[index]?.degree?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="College"
                    fullWidth
                    {...register(education.${index}.college, {
                      required: 'College is required',
                    })}
                    error={!!errors.education?.[index]?.college}
                    helperText={errors.education?.[index]?.college?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="Start Year"
                    type="number"
                    fullWidth
                    {...register(education.${index}.startYear, {
                      required: 'Start year is required',
                    })}
                    error={!!errors.education?.[index]?.startYear}
                    helperText={errors.education?.[index]?.startYear?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    label="End Year"
                    type="number"
                    fullWidth
                    {...register(education.${index}.endYear, {
                      required: 'End year is required',
                    })}
                    error={!!errors.education?.[index]?.endYear}
                    helperText={errors.education?.[index]?.endYear?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeEducation(index)}>
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() =>
              appendEducation({ degree: '', college: '', startYear: '', endYear: '' })
            }
          >
            Add Education
          </Button>
        </Grid>

        {/* Experience Section */}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Experience</Typography>
          {experienceFields.map((item, index) => (
            <Box key={item.id} mb={2} border={1} borderRadius={2} p={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    label="Company"
                    fullWidth
                    {...register(experience.${index}.company, {
                      required: 'Company is required',
                    })}
                    error={!!errors.experience?.[index]?.company}
                    helperText={errors.experience?.[index]?.company?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Start Date"
                    type="month"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register(experience.${index}.startDate, {
                      required: 'Start date is required',
                    })}
                    error={!!errors.experience?.[index]?.startDate}
                    helperText={errors.experience?.[index]?.startDate?.message}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="End Date"
                    type="month"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register(experience.${index}.endDate, {
                      required: 'End date is required',
                    })}
                    error={!!errors.experience?.[index]?.endDate}
                    helperText={errors.experience?.[index]?.endDate?.message}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => removeExperience(index)}>
                    <Remove />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() =>
              appendExperience({ company: '', startDate: '', endDate: '' })
            }
          >
            Add Experience
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {existingUser ? 'Update User' : 'Add User'}
          </Button>
          <Button onClick={onClose} variant="outlined" sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;