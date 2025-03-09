import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// Styled search box
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.2), // ✅ Visible background
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  border: '1px solid white', // ✅ Makes sure the input box is visible
  padding: '5px 10px',
}));

// Styled search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// Styled input field
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
    minWidth: '150px', // ✅ Prevents it from shrinking too much
    [theme.breakpoints.up('sm')]: {
      width: '20ch', // ✅ Sets a normal width
      '&:focus': {
        width: '30ch', // ✅ Expands on focus
      },
    },
  },
}));

export default function SearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
       

          {/* Brand Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
