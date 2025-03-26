// import coverBook from "../../assets/coverBook.png";
// import bookCover from "../../assets/imgages1.jpg";
import cover from "../../assets/images1.jpg"


const HomeItems = () => {
  return (
    <div className="flex md:flex-row-reverse flex-col py-12 items-center justify-between gap-12">
    
       {/* Second Session */}
       <div className="md:w-1/2 w-full flex items-center md:justify-end">
            <img src={cover} alt="Books" />
        </div>

       {/* First Session */}
      <div className="md:w-1/2 w-full">

            <h1 className="md:text-4xl text-2xl font-semibold mb-8">Latest Weekly Updates  </h1>
        
                <p className="md:text-lg text-sm mb-8 "> 
                The development of artificial intelligence (AI) has transformed numerous scientific disciplines. 
                Machine learning algorithms can analyze vast amounts of data, identify patterns, and make predictions
                with remarkable accuracy. AI is being used in everything from drug discovery to climate modeling, 
                offering new tools for scientists to tackle complex problems.
                </p>
        
            <button className="btn-primary text-white"> Subscribe</button>
      </div>

    </div>
  )
}

export default HomeItems
