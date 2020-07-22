import React, { useState, useContext, createRef } from 'react'
import { TextField, Button, Grid, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'
import TvContext from '../context/TvContext/TvContext'
const SearchBar = (): React.ReactElement => {
  const [text, setText] = useState('')
  const context = useContext(TvContext)
  const history = useHistory()
  const ref = createRef<HTMLButtonElement>()
  // console.log(context)
  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(event.target.value)
    if (event.target.value.length < 3) {
      context.clearShow()
    }
  }

  const handleSubmit = text => {
    context.setLoading()
    context.fetchShow(text)
    history.push('/')
  }
  return (
    <Paper
      style={{
        width: '80%',
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: '5px',
        padding: '0 5px'
      }}
    >
      <TextField
        fullWidth
        size="medium"
        label="Search TV Shows"
        autoComplete="autoComplete"
        name="search-term"
        style={{ flexBasis: '150%', margin: 'auto', marginLeft: '5px' }}
        value={text}
        onKeyUp={event => {
          if (event.keyCode === 13) {
            // Cancel the default action, if needed
            ref.current.click()
          }
        }}
        onChange={handleTextChange}
        placeholder="Breaking Bad..."
      />
      <Button
        style={{ width: '20%' }}
        size="small"
        variant="text"
        ref={ref}
        fullWidth
        onClick={() => handleSubmit(text)}
      >
        <SearchIcon />
      </Button>
    </Paper>
  )
}

export default SearchBar
