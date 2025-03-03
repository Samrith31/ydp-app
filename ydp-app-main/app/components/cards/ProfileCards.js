import React from "react";
import Image from "next/image";
import venkatesan from '@/public/venkatesan.jpg'
import { IoCallSharp} from "react-icons/io5";

const ProfileCards = () => {
  return (
      <div className="grid sm:grid-cols-3 mt-12 max-sm:max-w-xs mx-auto lg:mx-40">

<div className="h-auto pt-12">
     <div className="max-w-80 mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="px-4 py-6">
                <div className="text-center my-4">
                    
                        <Image src={venkatesan} width={200} alt="profile" className="h-44 w-44 rounded-full  mx-auto my-4"/>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800">வெங்கடேசன்</h3>
                        <h6 className="text-gray-600 ">தலைவர்</h6>
                        <div className="inline-flex text-green-800 items-center mt-4">
                        <a href="tel:7845174301">
                            
                            <p className="inline-flex">
                                <IoCallSharp className="mr-1 mt-0.2 text-lg"/>
                                +91 902-522-8598
                            </p>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>

<div className="h-auto pt-12">
     <div className="max-w-80 mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="px-4 py-6">
                <div className="text-center my-4">
                    
                        <Image src={venkatesan} width={200} alt="profile" className="h-44 w-44 rounded-full  mx-auto my-4"/>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800">வெங்கடேசன்</h3>
                        <h6 className="text-gray-600 ">தலைவர்</h6>
                        <div className="inline-flex text-green-800 items-center mt-4">
                        <a href="tel:7845174301">
                            
                            <p className="inline-flex">
                                <IoCallSharp className="mr-1 mt-0.2 text-lg"/>
                                +91 902-522-8598
                            </p>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>

<div className="h-auto pt-12">
     <div className="max-w-80 mx-auto bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="px-4 py-6">
                <div className="text-center my-4">
                    
                        <Image src={venkatesan} width={200} alt="profile" className="h-44 w-44 rounded-full  mx-auto my-4"/>
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800">வெங்கடேசன்</h3>
                        <h6 className="text-gray-600 ">தலைவர்</h6>
                        <div className="inline-flex text-green-800 items-center mt-4">
                        <a href="tel:7845174301">
                            
                            <p className="inline-flex">
                                <IoCallSharp className="mr-1 mt-0.2 text-lg"/>
                                +91 902-522-8598
                            </p>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
</div>

      </div>
  );
};

export default ProfileCards;
