/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import databaseService from "../../firebase/database.firebase";
import {Loader, PhotoCard} from '../index'

function Photos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const uid = useSelector((state) => state.auth.userData?.uid);

  useEffect(() => {
    setLoading(true);
    // console.log("Fetching photos...");
    databaseService
      .listFiles(uid)
      .then((res) => {
        const promises = res.items.map((itemRef) => {
          const data = {
            url: "",
            title: "",
            time: "",
            name: "",
          };
          const imagePath = itemRef;
          const name = imagePath._location.path_.split("/").pop();

          // Using Promise.all to wait for both downloadUrl and metadata
          return Promise.all([
            databaseService.downloadUrl(imagePath),
            databaseService.metadata(uid, name),
          ]).then(([url, metadata]) => {
            data.url = url;
            data.title = metadata.customMetadata.title;
            data.time = metadata.customMetadata.time;
            data.name = name;
            return data;
          });
        });

        // Wait for all promises to resolve
        Promise.all(promises)
          .then((dataArray) => {
            // Sort the photos based on the 'time' property
            const sortedPhotos = [...photos, ...dataArray].sort((a, b) =>
              b.time.localeCompare(a.time)
            );

            // Update state with the sorted data
            setPhotos(sortedPhotos);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uid]);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-4">
        {
          photos.length==0 && (
            <div className="flex justify-center items-center text-center text-2xl text-white/60 w-full">
              No photos uploaded yet
            </div>
          )
        }
        {photos.map((photo, index) => (
          <div key={index}>
            <PhotoCard photoUrl={photo.url} title={photo.title} name={photo.name}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
