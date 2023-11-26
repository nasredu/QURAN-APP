const Header = () => {
    return ( <header> <h1> header</h1></header> );
}

const Footer = () => {
    return ( <footer> <h1> footer</h1></footer> );
}
// -------------------------
const useFetch = (url) =>{
    
        const [data, setData] = React.useState(null);
        const[error, setError] = React.useState("")
        React.useEffect(()=>{
            fetch(url)
                .then( resp =>{
                    if (resp.status===200)
                        return resp.json()
                    throw new Error("cannot fetch data for that resource ...")
                })
                .then(data=>{
                    setData(data)
                    setError(null)
                })
                .catch(err=>setError(err.message))
        }, [url]);

        return {data, error}

    
}

// ---------------------------------------
const DisplaySourat =({listAyats})=>{
    // let souratData = getText(url)
    
    return (
        <section id="page">
        {listAyats.map(
            (ayat)=>(<section class="ayat">{ayat}</section>)
        )
        }
        
        </section>
    );
    
}
//   ------------------------------------
const Main = ({url, data}) => {
    
    let souratNber = 0
    const  listAyats  =data.data.surahs[souratNber].ayahs.map((sura)=>{ 
        return sura.text
        })

    return ( <section id="main"> 
             <DisplaySourat listAyats={listAyats}/>   
            </section> 
            );
}
// ----------------------------------
const App = () => {
    const text = null
    const souratNber = null //event.target.value
    // const url= "texts\\quran-khat-othmani.json"
    const url="https://sonic.dawsoncollege.qc.ca/~hnasreddine/sample_data/quran-khat-othmani.php"
    //https://sonic.dawsoncollege.qc.ca/~hnasreddine/sample_data/quran-khat-othmani.json"
    
    const {data, error } = useFetch(url)
    
    return (
        <>
        <Header/>
        {data && <Main url={url} data ={data}  />}
        <Footer/>
        </>
      );
}

ReactDOM.render(<App/>, document.querySelector('#root'))
 
// const getText = (event)=>{
//     let text = null
//     let souratNber = event.target.value
//     let url= "texts\\quran-khat-othmani.json"
//     fetch(url)
//         .then(resp=>resp.json())
//         .then(data=>{
//             console.log(data)
//             // displaySourat(data.data.surahs[souratNber].ayahs)
//             return data.data.surahs[souratNber].ayahs

//         })
//         .catch(err=>console.log('err:', err))
// }

// -------------------------------------
// const searchSourah = (index, keyword)=>{
//     let listAyats  = data.data.surahs[index].ayahs.map((sura)=>{
//   return sura.text
//   })
//   let result = listAyats.filter((txt)=>  (txt.indexOf(keyword)>=0) )
//   return result 
//   }