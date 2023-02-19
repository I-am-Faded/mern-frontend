import React from "react";

import styles from "./AddComment.module.scss";
import{ useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slice/auth';

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { useNavigate, Navigate, useParams } from 'react-router-dom';



export const Index = () => {
  const {id} =useParams();

  const isAuth = useSelector(selectIsAuth);
  const [comment, setComment] = React.useState('');

  let userData = useSelector((state) => state.auth.data);

  const onSubmit = async () => {
    try{
      const text = comment;

     if(isAuth){await axios.post(`/posts/${id}`, {text})}

     window.location.reload()
  } catch(err){
    console.log(err)
  }
}
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData.avatarURL}
          // "https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            onChange={e => setComment(e.target.value)}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
