import  axios from 'axios';
import {useState,useEffect} from 'react';
import './App.css';
import Search from './search'
function App() {

  const [categories,setCategories] = useState();
  const [search,setSearch] = useState();
  const [dataSearch,setDataSearch] = useState();


  useEffect(() => {
      retrieveCategories()
  }, [])


  const retrieveCategories = async () => {
    try {
      const {data}  = await axios.get("https://api.publicapis.org/categories")

      // console.log(response.data, '<== response categories')
      setCategories(data.categories)


    } catch (error) {

      console.log(error,'<==error retrive categories')
      
    }
  }
  
  const handleChange = (e) => {
    // console.log(e.target.value)
    setSearch(e.target.value);

  }
  
  const handleSubmit = async (e) => {
    try {

      // agar halaman tidak di refresh
      e.preventDefault()

      const {data} = await axios.get(`https://api.publicapis.org/entries?category=${search}`)
      // console.log(data,'<== response handle submit')
      setDataSearch(data.entries)
    }
     catch (error)
     {
      console.log(error,'<==error handle submit')
    }
  }

  return (
    <div className="App">
        <h1>React Api</h1>


        <form onSubmit={handleSubmit}>
          <input onChange={handleChange}/>
          <button type='submit'>Submit</button>
        </form>
 
        <ul>
          {dataSearch && dataSearch.map((item,index) => {
            console.log(item)
            return (
              <>
                <li>{item.API}</li>
                <li>{item.Category}</li>
                <li><a href={item.Link}>Link</a></li>
                <br />
                <br />
              </>
            ) 
          } )}
        </ul> 


        {/* <ul>
          {categories && categories.map((category,index) => (
              <li key={index}>{category}</li>
            ))}
        </ul> */}
    </div>
  );
}

export default App;
