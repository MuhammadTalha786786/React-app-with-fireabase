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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import { useSelector } from 'react-redux';
import { db } from '../../../../Components/firebase';



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

function RecipeReviewCard(props) {

    const appState = useSelector((state) => state.auth);
    const [expanded, setExpanded] = React.useState(false);
    const [tempLikes, setTempLikes] = React.useState(props?.postData?.likes);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const data = props?.postData
    console.log(data, "props.data")

    console.log(appState?.userInfo?.name, "app state data")


    const result = data?.likes?.find(x => x.userID === appState?.userInfo?.uid)
    const totalLikes = tempLikes.filter(x => x.isLike === true)

    console.log(result,"result")


    const addPostLiked = () => {
        // console.warn(tempLikes.length, "initial array")
        // console.log(arrayLikes);
        // likeStatus(arrayLikes);
        // setIsPostLiked(!isPostLiked);
        if (tempLikes?.length > 0) {
          let findCurrent = tempLikes.find(item => item.userID === appState?.userInfo?.uid);
          // console.warn(findCurrent != undefined, 'findCurrent');
          if (findCurrent != undefined) {
            let array = [];
            //  tempLikes = tempLikes.filter(el => userID !== el.userID);
            const upd_obj = tempLikes.map(obj => {
    
              if (obj.userID == appState?.userInfo?.uid) {
                obj.isLike = !obj.isLike;
              }
              return obj;
            })
    
    
            setTempLikes(upd_obj);
            // console.warn(tempLikes.length, "filterArray");
            // likeStatus([...tempLikes]);
              db
              .collection('posts')
              .doc(data.postID)
              .update({
                likes: tempLikes,
              })
              .then(() => {
                console.log('post updated!');
              });
          } else {
            tempLikes?.push({
              userID: appState?.userInfo?.uid,
              postDetail: data.postDetail,
              userName: appState?.userInfo?.name,
              userProfileImaege: appState?.userInfo?.image,
              timeLiked: new Date(),
              isLike: true
            });
            // setIsPostLiked(!isPostLiked);
               db
              .collection('posts')
              .doc(data.postID)
              .update({
                likes: tempLikes,
              })
              .then(() => {

                console.log('post updated!');
              });
          }
        } else {
    
          tempLikes?.push({
            userID: appState?.userInfo?.uid,
            postDetail: data.postDetail,
            userName: appState?.userInfo?.name,
            userProfileImaege: appState?.userInfo?.image,
            timeLiked: new Date(),
            isLike: true
          });
          
    
             db
            .collection('posts')
            .doc(data.postID)
            .update({
              likes: tempLikes,
            })
            .then(() => {
    
              console.log('post updated!');
            });
        }
        
      };
    



 


    return (
        <Card sx={{ maxWidth: 700, borderRadius: 0 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{}} aria-label="user image" src={data?.userImage}   >

                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={data?.userName}
                subheader={moment(data?.dateCreated.toDate()).format('MMMM Do, YYYY')}
            />
            <CardMedia
                component="img"
                height="194"
                image={data?.postImage}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"  onClick={addPostLiked} >
                    {
                        result?.isLike ? 
                     <FavoriteIcon  color='warning'     /> :
                     <FavoriteBorderRounded />
                    }

                </IconButton>
                <h5>{totalLikes.length}</h5>
                {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
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
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}


export default RecipeReviewCard