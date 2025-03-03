'use client'

import React, {useState} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Image from "next/image";
import { FaChevronLeft, FaChevronRight,FaTimes } from "react-icons/fa";

import image1 from '@/public/banner/1.jpg'
import image2 from '@/public/banner/2.jpg'
import image3 from '@/public/banner/3.jpg'

const images = [
    image1,image2,image3
 ]

const PhotoGallery = () => {

    const [data, setData] = useState({img:'', i: 0})

   const viewImage = (img, i) => {
       setData({img,i})
   }

   const imgAction = (action) => {
      let i = data.i;
      if(action === 'nxt-img'){
         setData({img: images[i+1], i: i+1});
      }
      if(action === 'pre-img'){
         setData({img: images[i-1], i: i-1});
      }
      if(!action){
         setData({img:'', i: 0});
      }
   }

  return (
    <div>
         {data.img &&
         <div style={{
            width:'100%',
            height:'100vh',
            background:'black',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
         }}>
            <button onClick={()=> imgAction()}
            style={{position:'absolute', top:'30px', right:'150px', color:'white'}}><FaTimes /></button>
            <button onClick={()=> imgAction('pre-img')}
               style={{color:'white'}} ><FaChevronLeft /></button>
            <Image src={data.img} style={{width:'auto', maxWidth:'90%', maxHeight:'90%'}} alt="slideshow" />
            <button onClick={()=> imgAction('nxt-img')}
               style={{color:'white'}} ><FaChevronRight /></button>
         </div>
         }

      <div style={{padding:"20px"}}>
        <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
        <Masonry columnsCount={3} gutter='20px'>

         {images.map((image, i) => (
               <Image key={i}
                src={image}
                style={{width:"100%", display:"block", cursor: "pointer", border:'1px solid rgb(173, 173, 173)'}}
                alt="gallery images"
                onClick={()=> viewImage(image,i)}/>

         ))}

        </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  )
}

export default PhotoGallery