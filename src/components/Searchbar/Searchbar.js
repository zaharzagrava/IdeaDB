import React, { useEffect, useState } from 'react'
import styles from "./SearchBar.module.scss";

import { useDispatch } from "react-redux";
import { TextField } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid';

import { SearchBarActionCreators as ACs } from "../../redux/SearchBar";

function Searchbar() {
  const [searchBarText, setSearchBarText] = useState('');
  const [seachBarId, setSeachBarId] = useState(uuidv4());

  const dispatch = useDispatch();

  function handleSubmit(event) {
    console.log(`Pressed keyCode ${event.key}`);

    if (event.key === 'Enter') {
      dispatch(ACs.elemChanged(seachBarId, event.target.value))
      setSearchBarText(event.target.value);

      event.preventDefault();
    }
  }

  useEffect(() => {
    console.log("Element is mounted");
    dispatch(ACs.elemMounted(seachBarId))

    return () => {
      console.log("Element is unomunted");
      dispatch(ACs.elemUnmounted(seachBarId))
    }
  }, [])

  return (
    <div className={styles.filter}>
      <TextField  color='primary'
                  className={styles.search_bar}
                  label="Filter by"
                  onChange={handleSubmit}
                  value={searchBarText}/>
    </div>
  )
}

export default Searchbar