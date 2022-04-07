/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import LaunchIcon from '@mui/icons-material/Launch';
import { format, parseISO } from 'date-fns';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleArticle({ article }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 5 }}>
      <CardHeader
        avatar={(
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {article.author ? article.author[0].toUpperCase() : ''}
          </Avatar>
                  )}
        title={article.title}
        subheader={article.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={article.urlToImage}
        alt={article.title}
      />
      <CardContent>
        <Typography color="text.secondary">
          {format(parseISO(article.publishedAt), 'dd-MMM-yyyy HH:mm')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography color="text.primary">
          {article.source.name}
        </Typography>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            window.open(article.url, '_blank').focus();
          }}
        >
          <LaunchIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{article.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

SingleArticle.propTypes = {
  article:
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      source: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string.isRequired,
    }).isRequired,
};
