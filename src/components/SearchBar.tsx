import React, { useState, useContext, createRef } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import TvContext from '../context/TvContext/TvContext'
const SearchBar = (): React.ReactElement => {
  const [text, setText] = useState('')
  const context = useContext(TvContext)
  const ref = createRef<HTMLButtonElement>()
  // console.log(context)
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setText(event.target.value)
    if(event.target.value.length < 3) {
      context.clearShow()
    }
  }

  const handleSubmit = (text) => {
      context.setLoading()
      context.fetchShow(text)
  }
  return (
    <Grid container alignItems='flex-end' style={{ margin: '10px auto', justifyContent: 'center', width: '60%', minWidth: '440px', zIndex: 10 }}>
      <Grid item xs={10}>
        <TextField
          fullWidth
          size='medium'
          label='Search TV Shows'
          autoComplete='autoComplete'
          name='search-term'
          value={text}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              // Cancel the default action, if needed
              ref.current.click()
            }
          }}
          onChange={handleTextChange}
          placeholder='Breaking Bad...'
        />
      </Grid>
      <Grid item xs={2} >
        <Button size='large' variant='text' ref={ref} fullWidth onClick={() => handleSubmit(text)} startIcon={<SearchIcon accentHeight='10px' />} />
      </Grid>
    </Grid>
  )
}

export default SearchBar
