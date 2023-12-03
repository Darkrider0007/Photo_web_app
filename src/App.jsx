import { Footer, Header } from "./components"
import { Outlet } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import authService from "./firebase/auth.firebase"
import { authLogin, authLogout } from "./store/authSlice"

function App() {
  
  const dispatch = useDispatch() 

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      try {
        // console.log("Fetching user data...");
        if (user) {
          // console.log(user.uid);
          const data = {
            uid: user.uid,
            email: user.email,
          };
          dispatch(authLogin(data));
        } else {
          console.log("User data is null, dispatching authLogout...");
          dispatch(authLogout());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });
  }, [dispatch]);

  return (
    <>
       <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
    </>
  )
}

export default App




// const [images, setImages] = useState([])
//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     const {  email, password } = event.target.elements
//     try {
//       const data = await authService.login(email.value, password.value)
//       console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const clicked = async () => {
//     try {
//       const data = await authService.getCurrentUser()
//       console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const out = async () => {
//     try {
//       const data = await authService.logout()
//       console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleFileSubmit = async (event) => {
//     event.preventDefault()
//     const { file } = event.target.elements
//     try {
//       const data = await databaseService.uploadFile(file.files[0])
//       console.log(data)
//     } 
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const fetchDownloadURLs = async () => {
//     try {
//       const data = await databaseService.listFiles();
//       const downloadURLs = await Promise.all(
//         data.items.map(async (image) => {
//           const url = await databaseService.downloadUrl(image);
//           return { ...image, url };
//         })
//       );
//       setImages(downloadURLs);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDownloadURLs();
//   }, []);