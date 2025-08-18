import Plot from 'react-plotly.js';
import PropTypes from "prop-types";
import styles from "../styles/graph.module.css"

// import { useState, useEffect } from 'react';

ScatterGraph.propTypes = {
  x: PropTypes.arrayOf(PropTypes.number).isRequired,
  y_list: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  title: PropTypes.string,
}
function ScatterGraph(props) {
  let data = []
  for(let i = 0; i < props.y_list.length; i++){
    data.push({
      x: props.x,
      y: props.y_list[i],
      type: 'scatter',
      mode: 'lines',
    });
  }

  return (
    <Plot className={styles.graph}
      data={data}
      layout={ {title: {text: props.title}} }
    />
  );
}

export default ScatterGraph