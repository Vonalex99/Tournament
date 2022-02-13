import React from "react";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/Vonalex99/">
          Github
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }