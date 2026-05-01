import { useEffect, useState } from "react";
import { useParams } from "react-router";

type DetailType = {
    Title: string;
    Year: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Poster: string;
    Plot: string;
};

function MovieDetail() {
    const { id } = useParams();
    const [detail, setDetail] = useState<DetailType | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setDetail(json))
            .catch(err => console.log(err));
    },[id]);

    return <>{detail}</>
}

export default MovieDetail;