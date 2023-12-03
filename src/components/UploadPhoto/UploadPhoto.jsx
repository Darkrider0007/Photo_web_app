/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import databaseService from '../../firebase/database.firebase';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

function UploadPhoto() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const uid = useSelector((state) => state.auth.userData?.uid);
    const submit = async (data) => {
        setLoading(true);
        databaseService.uploadFile(uid,String(data.title),data.image[0]).
        then(() => {
            console.log("Uploaded a blob or file!");
            // const Navigatepath = data.image[0].name;
            navigate("/");
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file.name);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    if (loading) {
        return (
          <Loader/>
        );
      }
    return (
        <div className='min-h-full w-full items-center flex justify-center'>
            <form onSubmit={handleSubmit(submit)} className="flex flex-col">
                <div className="w-full px-2 flex flex-row gap-2 text-xl">
                    <label className="mb-2">Title :</label>
                    <input
                        placeholder="Title"
                        className="mb-4 bg-white/10 p-2 rounded"
                        {...register("title", { required: true })}
                    />
                </div>
                <div className="w-full px-2">
                    <label className="mb-2">Upload Image :&nbsp; </label>
                    <input
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
                        onChange={handleImageChange}
                    />
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="mb-4 max-w-full max-h-96 mt-2"
                        />
                    )}
                </div>
                <div>
                    <button type="submit" className="px-4 py-2 rounded-xl  bg-blue-600 hover:bg-blue-700">
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadPhoto;
