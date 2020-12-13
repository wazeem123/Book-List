import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import BookCard from './BookCard.jsx';
function App() {
  // States
  
 
  const [cards, setCards] = useState([]);
  // Handle Search
  const handleSubmit = () => {
   
    
      axios
        .get(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=yt0uqbtQcE5viBwUJK6GvDANuDzJv4tF`
        )
        .then(res => {
        
            if (res.data.results.lists[0].books.length > 0) {
              setCards(res.data.results.lists[0].books);
              
            }
          
        })
        .catch(err => {
         
          console.log(err.response);
        });
    
  };
  // Main Show Case
  const mainHeader = () => {
    handleSubmit()
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column'>
        {/* Overlay */}
        <div className='filter'></div>
        <h1
          className='display-2 text-center text-white mb-3'
          style={{ zIndex: 2,fontFamily:"Roboto" }}
        >
          New York Times Books
        </h1>
        
      </div>
    );
  };

  const handleCards = () => {
    
    
      const items = cards.map((item, i) => {
        let thumbnail = '';
        if (item.book_image) {
          thumbnail = item.book_image;
        }

        return (
          <div className='col-lg-4 mb-3' key={item.book_image}>
            <BookCard
              thumbnail={thumbnail}
              title={item.title}
              authors={item.author}
              publisher={item.publisher}
              contributor={item.contributor}
              description={item.description}
              buyLink={item.buy_links[0].url}
             
            />
          </div>
        );
      });
      return (
        <div className='container my-5'>
          <div className='row'>{items}</div>
        </div>
      );
    
  };
  return (
    <div className='w-100 h-100'>
      {mainHeader()}
      {handleCards()}
     
    </div>
  );
}

export default App;
