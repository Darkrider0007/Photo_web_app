/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import databaseService from "../../firebase/database.firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../Loader";

function DisplayPhoto({ name }) {
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { register, handleSubmit } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const uid = useSelector((state) => state.auth.userData?.uid);
  const authStatus = useSelector((state) => state.auth.status)
  const navigation = useNavigate()
  if(!authStatus){
    navigation('/')
  }

  const update = async (data) => {
    try {
      setLoading(true);
      await databaseService.deleteItem(uid, name);
      await databaseService.uploadFile(uid, String(data.title), data.image[0]);
      navigate(`/`);
    } catch (error) {
      console.error("Error updating photo:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setLoading(true);
    databaseService
      .deleteItem(uid, name)
      .then(() => {
        console.log("File deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const data = {
      url: "",
      title: "",
      time: "",
    };
    const promises = [
      databaseService.downloadUrlFromName(uid, name),
      databaseService.metadata(uid, name),
    ];

    Promise.all(promises)
      .then(([url, metadata]) => {
        data.url = url;
        data.title = metadata.customMetadata.title;
        data.time = metadata.customMetadata.time;
        setPhoto(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);

  if (loading) {
    return <Loader />;
  }

  if (error || !photo.url) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Error Occurs</h1>
        <h1 className="text-4xl font-bold">Reload the Page</h1>
      </div>
    );
  }
	return (
		<div className="p-4">
			<div className="flex flex-col justify-center items-center m-4">
				<div className="w-full flex justify-end items-center m-2">
					<div
						onClick={handleDelete}
						className="h-10 w-10 rounded-full cursor-pointer bg-red-500 items-center justify-center flex hover:bg-red-600"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="2em"
							width="2em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
						</svg>
					</div>
				</div>
				<div className="h-2/4 w-2/4 flex items-center justify-center">
					<img src={photo.url} alt={photo.title} />
				</div>
				<div className="text-4xl mt-4">
					<h1 className="font-bold ">{photo.title}</h1>
				</div>
			</div>
			<hr />
			<div className="w-full flex flex-col items-center justify-center">
				<h1 className="text-4xl font-bold m-4 text-white/50">Update Image</h1>
				<form onSubmit={handleSubmit(update)} className="flex flex-col">
					<div className="w-full px-2 flex flex-row gap-2 text-xl">
						<label className="mb-2">Update Title :</label>
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
						<button
							type="submit"
							className="px-4 py-2 rounded-xl  bg-blue-600 hover:bg-blue-700"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default DisplayPhoto;
