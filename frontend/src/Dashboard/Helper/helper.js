import { Chip } from '@mui/material';

const GetChip = (chipId) => {
  switch (chipId) {
    case 'Pending':
      return (
        <Chip
          label="Pending"
          sx={{ color: 'black', fontWeight: '700', cursor: 'pointer' }}
        />
      );
    case 'Accepted':
      return (
        <Chip
          label="Accepted"
          sx={{
            backgroundColor: '#306de6',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        />
      );
    case 'Active':
      return (
        <Chip
          label="Active"
          sx={{
            backgroundColor: 'orange',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        />
      );
    case 'Completed':
      return (
        <Chip
          label="Completed"
          sx={{
            backgroundColor: 'green',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        />
      );
    case 'Rejected':
      return (
        <Chip
          label="Rejected"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        />
      );
    default:
      return;
  }
};

export { GetChip };
