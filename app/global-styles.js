import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fafafa;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100vh;
    min-width: 100%;
  }
  .container{
    width:85%;
    margin: 30px auto;
  }
  .bg-white{
    background: white;
    padding:20px;
  }
  .danger-btn{
    background:red;
    color:white;
    margin-top:20px;
    border-color:red;
  }
 textarea{
   border: 1px solid #eee;
   width: 100%;
   padding: 8px
 }
 .danger-btn{
   background:red;
   color:white;
   margin-top:20px;
 }
  p { 
    color: #999
  }
  .comments{
    text-align:left;
    p{
      color: #555;
      margin: 15px 0 !important;
    }
  }
  .logo{
    float:left;
    color:#555;
    font-weight:bold;
    padding-left:20px;
  }
  .ant-alert{
    margin-bottom: 30px;
  }
  .content{
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
  }
  .btn-success{
    background:#4CAF50;
    border-color: #4CAF50;
    :hover,:focus{
    background:#449d48;
    border-color: #449d48;
      
    }
  }
  /* Header */
  .sidebar .logo {
    text-align:center;
    img{
      width:50%;
      margin-bottom:30px;
    }
  }
  /* Login Page */
  .wrapper{
    text-align:center;
    padding-top:100px;
    .logo{
      margin:30px auto;
      font-size:50px;
    }
    h3{
      font-size:20px;
    }
    .login-form {
      max-width: 100%;
      margin-top:30px;
      input{
        background:transparent;
        :hover, :focus{
          border:1px solid #ccc7c7 !important;
          box-shadow:none;
        }
      }
      .login-form-forgot {
        text-align: right;
        margin-top:10px;
      }
      .go-back {
        text-align: left;
        margin-top:10px;
      }
      .login-form-button {
        width: 100%;
        .anticon svg{
          margin-top:-8px;
          margin-left:10px;
          color:white;
        }
      }
      .signup-btn{
        margin-top:25px;
      }
      .signup{
        margin-top:30px;
      }
      .content-divider {
        text-align: center;
        display:block;
        position: relative;
        z-index: 1;
        span {
          background-color: #eeeded;
          display: inline-block;
          padding: 1px 16px;
          line-height:18px;
          color: #999999;
          :before{
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            height: 1px;
            background-color: #ddd;
            width: 100%;
            z-index: -1;
          }
        }
      } 
    }
  }
  /* News page */

  .avatar-uploader {
    .ant-upload{
      border-radius:50%;
      margin:auto auto 10px auto;
      i{
        font-size:25px;
      }
    }
    .ant-upload {
      width: 128px;
      height: 128px;
    }
    img{
      width: 128px;
      height: 128px;
      border-radius:50%;
    }
  }
  .news-box{
    margin-bottom:  50px ;

  }
  footer{
    background: #fff;
    color: #8c8c8c;
    text-align: center;
    padding: 20px 0;
  }
    
`;

export default GlobalStyle;
