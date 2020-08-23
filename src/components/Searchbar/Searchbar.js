import React from 'react'
import { TextField, Select, MenuItem, AppBar, Toolbar, InputLabel, FormControl } from '@material-ui/core'

import styles from "./Searchbar.module.scss";

function Searchbar() {
  return (
    <div className={styles.filter}>
      <TextField color='primary' className={styles.search_bar} label="Filter by"/>
      <FormControl className={styles.select_order}>
        <InputLabel id="select-label">Order by</InputLabel>
        <Select
            labelId="select-label"
            id="demo-simple-select"
            // value={age}
            // onChange={handleChange}
          >
            <MenuItem variant="outlined" value={"byDateLastModified"}>By Date Last Modified</MenuItem>
            <MenuItem variant="outlined" value={"byDateCreated"}>By Date Created</MenuItem>
            <MenuItem variant="outlined" value={"byIdentifier"}>ByI dentifier</MenuItem>
          </Select>
      </FormControl>
    </div>
  )
}

export default Searchbar
