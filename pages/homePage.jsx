import Header from "../components/header";
import FavouritePage from "./favouritePage";

export default function HomePage(){


    return(
        <div className="w-full h-screen ">
            <Header/>
            <div className="w-full min-h-[calc(100vh-70px)] ">
                <Routes path="/*">
                    <Route path="/home" element={<h1>Home page</h1>}/>
                    <Route path="/favourite" element={<FavouritePage/>}/>
                   

                </Routes>

            </div>

        </div>




    );
}