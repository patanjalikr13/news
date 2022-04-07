import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Grid } from '@mui/material';
import styles from './App.module.css';
import SingleArticle from './SingleArticle';

function App() {
  const [config, setConfig] = useState({
    loading: 'loading',
    articles: null,
  });

  useEffect(() => {
    axios.get('https://saurav.tech/NewsAPI/everything/cnn.json').then((res) => {
      setConfig({
        ...config,
        loading: 'finished',
        articles: res.data.articles,
      });
    }).catch(() => {
      setConfig({
        ...config,
        loading: 'errored',
      });
    });
  }, []);
  return (
    <>
      {config.loading === 'errored' && (
      <div className={styles.centerScreen}>
        Something went wrong.
      </div>
      )}
      {config.loading === 'loading' && (
      <div className={styles.centerScreen}>
        <CircularProgress />
      </div>
      )}
      {config.loading === 'finished' && config.articles && (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 3, md: 4 }}>
        {config.articles.map(
          (article) => (
            <Grid item key={article.url}>
              <SingleArticle article={article} />
            </Grid>
          ),
        )}
      </Grid>
      )}
    </>
  );
}
export default App;
