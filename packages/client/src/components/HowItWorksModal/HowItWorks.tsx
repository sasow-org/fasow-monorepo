import React, { useState } from 'react';
import { Modal, Box, IconButton, Grid, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface HowItWorksProps {
  tutorialStepImagesSource: { img: string; description: string }[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

// eslint-disable-next-line react/function-component-definition
const HowItWorks: React.FC<HowItWorksProps> = ({ tutorialStepImagesSource, open, setOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if (currentIndex < tutorialStepImagesSource.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={1}>
              <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>

            <Grid item xs={10} container justifyContent="center">
              <img
                src={tutorialStepImagesSource[currentIndex].img}
                alt={`Tutorial step ${currentIndex + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <Typography variant="body1" mt={2}>
                {tutorialStepImagesSource[currentIndex].description}
              </Typography>
            </Grid>

            <Grid item xs={1}>
              <IconButton onClick={handleNext} disabled={currentIndex === tutorialStepImagesSource.length - 1}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" mt={1}>
            <Typography variant="body2">
              {`Step ${currentIndex + 1} of ${tutorialStepImagesSource.length}`}
            </Typography>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default HowItWorks;
