import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";



const Favourites = (props:any) => {
  const [favorites, setFavorites] = React.useState<any[]>([]);
  const [isliked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    console.log(storedFavorites)
    if (storedFavorites) {
      if(storedFavorites.indexOf(props.id) > -1){
        setIsLiked(true)
      }
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (favorite: number) => {
    console.log(favorite)
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
    setIsLiked(true)
  };

  const removeFavorite = (favoriteId: number) => {
    console.log(favoriteId)
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => {
        favorite !== favoriteId})
    );
    setIsLiked(false)
  };



  function onClick(id: any, isliked: boolean) {
    if(favorites.indexOf(id) > -1){
      console.log("remove")
      removeFavorite(id)
    }else{
      addFavorite(id)
    }
  }

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); //TODO

    
  }, [favorites]);


  return (
    <div>
       {isliked? <HeartFilled style={{color:'red'}} onClick={()=> onClick(props.id,false)} /> :<HeartOutlined onClick={()=> onClick(props.id, true)}/>}
    </div>
  );
  
}

export default Favourites;