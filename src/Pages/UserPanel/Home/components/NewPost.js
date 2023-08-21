import React, { Component } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import RaisedButton from '@material-ui/core/Button'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';


import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center"
//   },
//   icon: {
//     margin: theme.spacing(2)
//   },
//   cardContainer:{
//     width: "100px",
//     margin: "10px",
//   },
//   cardRoot: {
//     paddingBottom: "14px !important"
//   },
//   cardRootHide: {
//     paddingBottom: "14px !important",
//     margin: "-16px"
//   },
//   input: {
//     display: "none"
//   },
//   button: {
//     color:"#000",
//     margin: 10
//   },
//   logo: {
//     width: "100px",
//     height: "100px"
//   },
//   submit: {
//     marginTop: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: "120px",
//   }
// }));


function NewPost() {
  // const classes = useStyles();
  const [image, setImage] = React.useState("");
  const [uploadState, setUploadState] = React.useState("initial");


  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImage(reader.result);
        setUploadState("uploaded");

      };
    }
  };


  const handleResetClick = (event) => {
    setUploadState("initial");
  };


  return (
    <div className="row">
      <Card className=""  style={{  }}  >
        <TextField placeholder="What's the  happening ?" id="newpost" name="newpost"   rows={2} fullWidth={true} multiLine={true} />
        
        {/* <Card > */}
        <CardContent
          // className={
          //    classes.cardRoot  
          // }
        >
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/jpeg,image/png,image/tiff,image/webp"
              style={{display:'none'}}
              id="contained-button-file"
              name="logo"
              type="file"
              onChange={handleUploadClick}
            />
            <label
              htmlFor="contained-button-file"
              // className={classes.input}
            >
              <Fab component="span">
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Grid>
        </CardContent>
        {uploadState === "uploaded" && (
          <CardActionArea onClick={handleResetClick}>
            <img style={{width:'100px', height:'200px'}} src={image} alt="LOGO" />
          </CardActionArea>
        )}
      {/* </Card> */}
        
        <div className="new-post-action  mt-10 ml-10  ">
          <Button   variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NewPost