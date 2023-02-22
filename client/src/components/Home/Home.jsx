import Nav from "../Nav/Nav";
import Searchbar from '../Searchbar/Searchbar'
import Filter from '../Filter/Filter'
import Order from "../Order/Order";

export default function Home(props) {
  return (
    <div>
      <Nav />
      <div>
        <h2>Find <span>best recipes</span> for cooking</h2>
        <Searchbar />
      </div>

      <div>
        <Filter />
        <Order />
      </div>

    </div>
  )
}