# React & Typescript Starter Pack

### Step to use this repo

1. Clone it by running ```git clone https://github.com/sammyl720/react-typescript-starter.git```

1. Run ```yarn install ``` or ``` npm install ``` to install dependencies
1. Run ``yarn run dev`` or `` npm run dev `` to spin up a live server on port 8081 for development
1. Run ``yarn run build`` or `` npm run build `` to build a dist folder for production.


### Features

#### Image and CSS Files loading directly into your components
````
 import React from 'react';
 import myImage from './imgs/my-image.png';
 import './css/image.css'

 const ImageDisplay = ({ title }: { title: string }): React.ReactElement => {
   return (
     <div className='image-wrapper'>
        <img src={myImage} alt={title} className='image'>
     </div>
   )
 }

 export default ImageDisplay
````