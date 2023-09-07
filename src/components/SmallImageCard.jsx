import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/system';

const SmallImageCardWrapper = styled(Card)({
  maxWidth: 100,
});

const SmallImageMedia = styled(CardMedia)({
  height: 50,
});

const SmallImageCard = ({ imageUrl }) => {
  return (
    <SmallImageCardWrapper>
      <SmallImageMedia
        component="img"
        image={imageUrl} 
        alt="Small Image"
      />
    </SmallImageCardWrapper>
  );
};

export default SmallImageCard;
