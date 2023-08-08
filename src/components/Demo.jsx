import { useState, useEffect } from "react";
import { useLazyGetCapsuleQuery } from '../services/capsule'
import { Loader } from './index'
import { AiFillCopy } from 'react-icons/ai'


const Demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })

  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState("")


  const [getCapsule, {error, isFetching}] = useLazyGetCapsuleQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    
    if(articleFromLocalStorage){
      setAllArticles(articleFromLocalStorage);
    }
  }, [])

  const handleSubmit = async (e)=> {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getCapsule({ articleUrl: article.url})
    if(data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updateAllArticles = [newArticle, ...allArticles];
      
      setArticle(newArticle);
      setAllArticles(updateAllArticles)
      localStorage.setItem('articles', JSON.stringify(updateAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  const handleSummaryCopy = () => {
    navigator.clipboard.writeText(article.summary)
    alert('Summary Copied to Clipboard')
  }

  return (
    <section className="w-full flex">
      <div className="flex flex-col w-full gap-2">
        <form 
          className=" relative flex  items-center ml-20"
          onSubmit={handleSubmit}
        >
          <input 
            type="url"
            placeholder="Enter a URL here"
            value={article.url}
            onChange={(e) => setArticle({...article, url: e.target.value})}
            required
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-900 w-1/3 mx-2"
          />
          <button type="submit" className="shadow bg-slate-900 hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-2 rounded">
            Submit
          </button>
        </form>
      
        <div className="flex flex-col">
          <p className="text-xl font-bold text-slate-900 lg:text-xl dark:text-slate-900 ml-20 mt-10 ">History</p>
          <hr className="w-3/4 ml-20" />
          <div className="flex flex-col ">
            {allArticles.length == 0 ? 
              (<p className="text-xl  text-slate-900 lg:text-xl dark:text-slate-900 ml-20 mt-2 ">
                Nothing Here!!
              </p>) 
              :
              (allArticles.map((item, index) => (
                <div 
                  key={`link-${index}`}
                  onClick={() => setArticle(item)}
                  className="flex my-2 items-center justify-center w-1/2 border-solid border-2 border-slate-900 ml-20 py-1"
                >
                  <div className="copy_btn mr-2 ml-4 border-solid" onClick={() => handleCopy(item.url)}>
                    <AiFillCopy size={25}/>
                  </div>
                  <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
                </div>
              )))}
          </div>
        </div>
      </div>

     {/* Display Result */}
     <div className='w-full flex '>
        {isFetching ? (
          <Loader msg={"Summarizing your Article"}/>
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that wasn't supposed to happen...
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3 w-full mr-10'>
              <div className="flex">                
                <p className="text-xl font-bold text-slate-900 lg:text-2xl dark:text-slate-900 font-satoshi ">Summary</p>
                <button className="ml-5" onClick={handleSummaryCopy}>
                  <AiFillCopy size={25}/>
                </button>
              </div>
              <div className='summary_box mr-20 border-solid border-slate-900 '>
                <p className='font-inter font-medium text-sm text-slate-900 text-justify '>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo