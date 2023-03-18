import { Chip } from "@mui/material";

const GetChip = (chipId) => {
  switch (chipId) {
    case 'Pending':
      return (
        <Chip label="Pending" sx={{ color: 'black', fontWeight: '700' }} />
      );
    case 'Active':
      return (
        <Chip
          label="Active"
          sx={{ backgroundColor: 'orange', color: 'white', fontWeight: '700' }}
        />
      );
    case 'Completed':
      return (
        <Chip
          label="Completed"
          sx={{ backgroundColor: 'green', color: 'white', fontWeight: '700' }}
        />
      );
    case 'Rejected':
      return (
        <Chip
          label="Rejected"
          sx={{ backgroundColor: 'red', color: 'white', fontWeight: '700' }}
        />
      );
    default:
      return;
  }
};

export {
  GetChip,
}