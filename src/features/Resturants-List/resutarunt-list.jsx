import { useLocation, useNavigate } from "react-router-dom";
import Filter from "../../shared/components/Filter/filter";

export function Resturants({data}){
  const location = useLocation();
  const collections = data ?? location.state.data ?? [];
  const getCollectionName = location.state?.name ?? '';
  console.log(location.state?.name);
    let navigate = useNavigate();
    const goToItem = (index)=>{
    console.log(index);
    navigate("/food-item",{ state: data[index]?.menuData });
  }
    return(
        <div className="m-116">
        {getCollectionName && <h2>{getCollectionName}</h2>}
        <Filter/>
        <div className="grid mt-3">
        {collections.map((data, index) => (
          <div className="card" key={index} onClick={()=>goToItem(index)}>
            <div className="image-container">
              <img src={data.image} alt={data.name} />

              {data.offer && <span className="offer">{data.offer}</span>}

              {data.rating && <span className="rating">{data.rating} ★</span>}
            </div>

            <div className="content">
              <div className="grid-header">
                <h3>{data.name}</h3>
                <span className="price">₹{data.priceForTwo} for two</span>
              </div>

              <p className="cuisines">{data.cuisines}</p>

              <div className="footer">
                <span>{data.location}</span>
                <span>{data.distance}</span>
              </div>

              <p className="timing">Opens at {data.openingTime}</p>
            </div>
          </div>
        ))}
      </div>
        </div>
    )
}